import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import {
  Table,
  Divider,
  Tag,
  Popconfirm,
  Card,
  Button,
  Icon,
  Input,
  message
} from "antd";
import moment from "moment";
import { Link } from "@reach/router";
import Highlighter from "react-highlight-words";
import { MDBBadge, MDBContainer } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { navigate } from '@reach/router'
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { Accounts } from "meteor/accounts-base";
import CreateStudent from "../Create/student";
import { Student } from "../../api/student";
import UploadFile from "../Create/fileUpload";
import { Select, Spin } from "antd";
import { Classe } from "../../api/classes";

export class listPatients extends Component {
  state = {
    searchText: "",
    modal: false,
    userId: "",
    modal2: "",
    userRemoved: "",
    username: "",
    selected: [],
    modal3: false,
    classes : [],
  };
  addStudents = () => {
    Meteor.call('add.to.class', this.state.classes, this.state.selected, (err, res) => {
     if(err){
       message.error(error.reason);
     }
     else {
       this.setState({modal3 : false});
       message.success("Students added to selected classes!");
       
     }
    });
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });
  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "username",
        key: "username",
        ...this.getColumnSearchProps("username")
      },
      {
        title: "Email",
        key: "email",
        render: (text, record) => (
          <a href={`mailto:${record.email}`}>{record.email}</a>
        )
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <MDBBtn outline color="success" size="sm" onClick={() => navigate('/student/' + record._id)}> 
              {" "}
              View Student{" "}
            </MDBBtn>
            <MDBBtn outline color="danger" size="sm" onClick={() => {
              Meteor.call("delete.student", record._id, (err, res) => {
                if(err){
                  message.error(err.reason);
                }
                else { 
                  message.success("Student & all related records are deleted!")
                }
              })
            }}>
              Delete Student
            </MDBBtn>
          </span>
        )
      }
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
        let arr = [];
        selectedRows.map(a => arr.push(a._id));
        this.setState({ selected: arr });
      },
      getCheckboxProps: record => ({
        id: record._id
      })
    };
    return (
      <Card
        style={{ marginLeft: "5%", marginRight: "2%" }}
        loading={!this.props.ready}
      >
        <MDBBtn
          outline
          color="default"
          size="sm"
          onClick={() => this.setState({ modal3: true })}
          disabled={this.state.selected.length == 0 ? true : false}
        >
          {" "}
          Add To a Class{" "}
        </MDBBtn>

        <MDBBtn
          outline
          color="success"
          size="sm"
          onClick={() => this.setState({ modal: true })}
        >
          {" "}
          Create Student{" "}
        </MDBBtn>
        <MDBBtn
          outline
          color="info"
          size="sm"
          onClick={() => this.setState({ modal2: true })}
        >
          {" "}
          Import Students
        </MDBBtn>
        <MDBModal
          isOpen={this.state.modal}
          toggle={() => this.setState({ modal: false })}
        >
          <MDBModalHeader toggle={() => this.setState({ modal: false })}>
            Create Student
          </MDBModalHeader>
          <MDBModalBody>
            <CreateStudent close={() => this.setState({ modal: false })} />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => this.setState({ modal: false })}
            >
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <MDBModal
          isOpen={this.state.modal2}
          toggle={() => this.setState({ modal2: false })}
        >
          <MDBModalHeader toggle={() => this.setState({ modal2: false })}>
            Import Students
          </MDBModalHeader>
          <MDBModalBody>
            <UploadFile close={() => this.setState({ modal2: false })} />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => this.setState({ modal2: false })}
            >
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <MDBModal
          isOpen={this.state.modal3}
          
        >
          <MDBModalHeader>
            Select Class
          </MDBModalHeader>
          <MDBModalBody>
            <Select
              mode="multiple"
              labelInValue
              placeholder="Select users"
              filterOption={false}
              onChange={l => {
                let arr = [];

                l.map(a => {
                arr.push(a.key);
              }
              )
              console.log(arr);
              this.setState({classes : arr});
              }}
              style={{ width: "100%" }}
            >
              {this.props.classes.map(d => (
                <Select.Option key={d._id}>{d.name}</Select.Option>
              ))}
            </Select>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => this.setState({ modal3: false })}
            >
              Close
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={() => this.addStudents()}
            >
              Add
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.props.data}
          rowKey={record => record._id}
        />
      </Card>
    );
  }
}

const ViewArticlesWrapper = withTracker(props => {
  const status = Meteor.subscribe("get.students");
  const status2 = Meteor.subscribe("get.classes");
  const data = Student.find({}).fetch();
  const classes = Classe.find({}).fetch();
  const ready = status.ready();
  return {
    data,
    ready,
    classes,
    ...props
  };
})(listPatients);

export default ViewArticlesWrapper;
