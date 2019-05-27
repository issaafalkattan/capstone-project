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
import { Link, navigate } from "@reach/router";
import Highlighter from "react-highlight-words";
import { MDBBadge, MDBContainer } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { Accounts } from "meteor/accounts-base";
import { Student } from "../api/student";
import { Select, Spin } from "antd";
import { Classe } from "../api/classes";

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
    classes: []
  };

  removeStudents = () => {
      Meteor.call("remove.from.class", this.state.selected, this.props.id, (err, res) => {
          if(err){
            this.setState({modal : false})

              message.error(err.reason)
          }else {
              this.setState({modal : false})
              message.success("Student(s) removed!")
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
          
              View Student
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
       <MDBModal
          isOpen={this.state.modal}
          toggle={() => this.setState({ modal: false })}
        >
          <MDBModalHeader toggle={() => this.setState({ modal: false })}>
              Remove Student from Class
          </MDBModalHeader>
          <MDBModalBody>
           Are you sure you want to remove student(s) from class?
           </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => this.setState({ modal: false })}
            >
              Cancel
            </MDBBtn>
            <MDBBtn
              color="secondary"
              onClick={() => this.removeStudents()}
            >
              Confirm
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <MDBBtn
          outline
          color="default"
          size="sm"
          onClick={() => this.setState({ modal: true })}
          disabled={this.state.selected.length == 0 ? true : false}
        >
          {" "}
          Remove
        </MDBBtn>
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
  const classId = props.id;
  const status = Meteor.subscribe("get.students");
  const status2 = Meteor.subscribe("get.classes");
  const classs = Classe.findOne({ _id: classId });
  let data;
  if (classs) {
    let list = classs.studentList || [];
    data = Student.find({ _id: { $in: list } }).fetch();
  }
  const ready = status.ready();
  return {
    data,
    ready,
    classs,
    ...props
  };
})(listPatients);

export default ViewArticlesWrapper;
