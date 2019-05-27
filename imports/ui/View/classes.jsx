import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import { Table, Divider, Tag, Popconfirm, Card, Button, Icon, Input, message } from 'antd';
import moment from 'moment';
import {Link, navigate} from '@reach/router'
import Highlighter from 'react-highlight-words';
import { MDBBadge, MDBContainer } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBBtn,MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import { Accounts } from 'meteor/accounts-base'
import {Classe} from '../../api/classes'
export class listPatients extends Component {
    state = {
        searchText : '',
        modal : false,
        userId : '',
        modal2 : '',
        userRemoved : '', username : '',
        modal3 : false,
        classId : '',
    }
    deleteClass =(id)=>{
      Meteor.call('delete.class', this.state.classId, (err, res) => {
        if(err){
          message.error(err.reason);
        }
        else { 
          this.setState({modal3 : false});
          message.success("Class Deleted successfully!")
        }
      })
    }
  
    resetUserPassword = () => {
        const userId = this.state.userId;
        const newPassword = this.state.newPassword;
        if(userId != '' && newPassword != ''){
        Meteor.call('reset.password', {userId : userId, newPassword : newPassword}, (err, res) => {
   if(!err){
    this.setState({userId : '', newPassword : '', modal : false});
    message.success("Password Changed!")
   }
   else {
       message.error(err.reason)
   }
        });
    
        }
        else {
            message.error("No user selected!!")
        }
    }
    removeUser = () => {
        const id = this.state.userRemoved;
        Meteor.call('remove.user', id, (err, res) => {
            if(err){
                this.setState({ userRemoved : '', username : '', modal2 : false})
                message.error(err.reason);
            }
            else { 
                message.success("User Removed!");
            }
        });

    }
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      })
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      }
      handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
      }
  render() {
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),

  
      },
      {
        title: 'Number Of Students',
        dataIndex: 'studentList',
        key: 'studentList',
        render: (text, record) => 
            <h6>{record.studentList ?record.studentList.length : 0}</h6>
        ,
  
      },
      {
        title: 'Schedule',
        key: 'Schedule',
        render: (text, record) => 
            record.schedule.map(a => {
             return <Tag color="geekblue">{a}</Tag>
             })
        ,

      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>

<MDBBtn outline color="success" size="sm" onClick={() => navigate('/class/' + record._id)}> View Class </MDBBtn>
<MDBBtn outline color="danger" size="sm" onClick={() => this.setState({modal3 : true, classId : record._id})}>Delete Class</MDBBtn>

          </span>
        ),
      }];
   
    return (
        <Card style={{marginLeft : '5%', marginRight : '2%'}} loading={!this.props.ready}>
         <MDBModal
          isOpen={this.state.modal3}
          toggle={() => this.setState({ modal3: false })}
        >
          <MDBModalHeader toggle={() => this.setState({ modal3: false })}>
            Delete Class
          </MDBModalHeader>
          <MDBModalBody>
            <p>Are you sure you want to delete this class ? <br/>
            <strong>This action cannot be undone.</strong>
            </p>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => this.setState({ modal3: false })}
            >
              Cancel
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={() => this.deleteClass()}
            >
              Confirm
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
           <Table columns={columns} dataSource={this.props.data} rowKey={record => record._id}/>
      
      </Card>
    )
  }
}

const ViewArticlesWrapper = withTracker((props) => {
    const status = Meteor.subscribe('get.classes');
    const data = Classe.find({}).fetch();
    const ready = status.ready();
    return {
      data,
      ready,
      ...props,
  
    };
  })(listPatients);
   
  export default ViewArticlesWrapper;
  