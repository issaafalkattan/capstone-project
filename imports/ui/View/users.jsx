import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import { Table, Divider, Tag, Popconfirm, Card, Button, Icon, Input, message } from 'antd';
import moment from 'moment';
import {Link} from '@reach/router'
import Highlighter from 'react-highlight-words';
import { MDBBadge, MDBContainer } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBBtn,MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import { Accounts } from 'meteor/accounts-base'
export class listPatients extends Component {
    state = {
        searchText : '',
        modal : false,
        userId : '',
        modal2 : '',
        userRemoved : '', username : ''
    }
    getRole = (arr) => {
        if(arr[0] == 'admin'){
            return        (<MDBContainer><MDBBadge color="default">Admin</MDBBadge></MDBContainer>)

        }
        else if(arr[0] == 'teacher'){
            return      (<MDBBadge color="info">Teacher</MDBBadge>)

        }
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
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        ...this.getColumnSearchProps('username'),

  
      },
      {
        title: 'Role',
        dataIndex: 'roles',
        key: 'role',
        render: (text, record) => 
            {getRole(record.roles)}
        ,
        ...this.getColumnSearchProps('roles'),

  
      },
     
    
      {
        title: 'Date Of Creation',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => <h6>{moment(text).format('DD/MM/YYYY')}</h6>,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.createdAt - b.createdAt,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>

<MDBBtn outline color="info" size="sm" onClick={() => this.setState({modal :true, userId : record._id})}>Reset Password</MDBBtn>
<MDBBtn outline color="danger" size="sm" onClick={() => this.setState({modal2 : true,  userRemoved : record._id, username : record.username})}>Delete Account</MDBBtn>

          </span>
        ),
      }];
   
    return (
        <Card style={{marginLeft : '5%', marginRight : '2%'}} loading={!this.props.ready}>
              <MDBModal isOpen={this.state.modal} toggle={() => this.setState({modal : false})}>
        <MDBModalHeader toggle={() => this.setState({modal : false})}>Reset Password</MDBModalHeader>
        <MDBModalBody>
         <Input type="password" onChange={(e) => this.setState({newPassword : e.currentTarget.value}) }/>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => this.setState({modal : false})}>Close</MDBBtn>
          <MDBBtn color="primary" onClick={() => this.resetUserPassword()}>Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
      <MDBModal isOpen={this.state.modal2} toggle={() => this.setState({modal2 : false,  userRemoved : '', username : ''})}>
        <MDBModalHeader toggle={() => this.setState({modal : false})}>Remove User</MDBModalHeader>
        <MDBModalBody>
<p> Are you sure you want to remove this user {this.state.username}? Please note that this action is <strong>IRREVERSIBLE</strong> and cannot be <strong>undone</strong></p>        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => this.setState({modal2 : false, userRemoved : '', username : ''})}>Cancel</MDBBtn>
          <MDBBtn color="primary" onClick={() => this.removeUser()}>Confirm</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
 
           <Table columns={columns} dataSource={this.props.data} rowKey={record => record._id}/>
      
      </Card>
    )
  }
}

const ViewArticlesWrapper = withTracker((props) => {
    const status = Meteor.subscribe('get.users');
    const data = Meteor.users.find({}).fetch();
    const ready = status.ready();
    return {
      data,
      ready,
      ...props,
  
    };
  })(listPatients);
   
  export default ViewArticlesWrapper;
  