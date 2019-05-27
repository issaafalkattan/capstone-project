import React, { Component } from "react";
import 'ant-design-pro/dist/ant-design-pro.css'; // Import whole style
import Charts from 'ant-design-pro/lib/Charts';
import { Bar } from 'ant-design-pro/lib/Charts';
import ListStudents from './listStudents'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtnGroup,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { withTracker } from "meteor/react-meteor-data";
import { Classe } from "../api/classes";
import { List, Avatar, Button, Skeleton, Table, message, Icon } from 'antd';

import { Student } from "../api/student";
import {Attendance, Attendances} from '../api/attendance'
import moment from 'moment';
import { navigate } from "@reach/router";
class Class extends Component {
  state = {
    modal  :false,
  }
  render() {
 
    const columns = [{
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render : (text, record) => <p>{moment(text).toDate().toISOString()}</p>


    },
    {
      title: 'Attended',
      dataIndex: 'attended',
      key: 'attended',

    },
    {
      title: 'Absent',
      dataIndex: 'absent',
      key: 'absent',

    },
    {
      title: 'Ratio',
      dataIndex: 'ratio',
      key: 'ratio',

    },
  ];
 
    return (
      <MDBContainer>
    
        <div>
          <h4>
            {this.props.data ? this.props.data.name : "Class"}
            <br />
           <p> <small>Class Profile</small></p>
          </h4>
        </div>
        <MDBModal
         fullHeight  position="bottom"
          isOpen={this.state.modal}
          toggle={() => this.setState({ modal: false })}
        >
          <MDBModalHeader toggle={() => this.setState({ modal: false })}>
            Student List
          </MDBModalHeader>
          <MDBModalBody>
            <ListStudents id={this.props.id} />
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
        
        <MDBRow className="mb-4">
        <MDBCol sm="6">
            <MDBCard >
            <MDBCardBody>
                <MDBCardTitle>Attendance <MDBBtn onClick={() => 

                Meteor.call('increment.counter', this.props.data._id, (err,res) => {
                     if(err){
                       message.error(err.reason);
                     }
                     else {
                      navigate(`/qr/${this.props.data._id}`);
                     }
                })
               }><i class="fas fa-qrcode"></i> QRCode Attendance</MDBBtn></MDBCardTitle>
                <MDBCardText>
                <Table columns={columns} dataSource={this.props.parsedD} rowKey={record => record._id}/>
                <Bar height={200} title="Attendance Ratios" data={this.props.graphData}  />


                </MDBCardText>


</MDBCardBody>
            </MDBCard>
            </MDBCol>
          <MDBCol sm="6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>
                Students   
              
        <MDBBtn className="mr-1" color="white" size="sm" onClick={() => this.setState({modal : true})}><i  className="fas fa-list" /> List</MDBBtn>
        <MDBBtn className="mr-1" color="green" size="sm" onClick={() => navigate("/view-students")}> <i  className="fas fa-plus" />Add</MDBBtn>
 
</MDBCardTitle>

                <MDBCardText>
                <List
 itemLayout="vertical"
    size="large"
    pagination={{
  onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}   
    dataSource={this.props.students}
    renderItem={a => (
      <List.Item key={a._id}>
        <List.Item.Meta
          avatar={<Avatar style={{verticalAlign: 'middle' }} size="large">
                        {a.username}
        </Avatar>}
          title={<a href={`/student/${a._id}`}>{a.fname}  {a.lname}</a>}
          description={a.email}
        />
             

      </List.Item>
    )}    
     />             
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          
          <MDBCol sm="6" style={{marginTop : '5%'}} >
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Class Description</MDBCardTitle>
                <MDBCardText>
                <div class="block-section">
        <table class="table table-borderless table-striped table-vcenter">
            <tbody>
         
            <tr>
                <td class="text-right">Name</td>
                <td>{this.props.data ? this.props.data.name : "Class"}</td>
            </tr>
            <tr>
                <td class="text-right">Allowed Absence</td>
                <td>{this.props.data ? this.props.data.allowedNumber : 'NA'}</td>
            </tr>
            <tr>
                <td class="text-right">Meeting Days</td>
                <td>
                {this.props.data ? 
                this.props.data.schedule.map(a =>                 <span class="label label-default">{a} </span>
) : "NA"}
                </td>
            </tr>
           
          
          
          
            </tbody>
        </table>
    </div>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          
          <MDBCol sm="6">
            <MDBCard style={{marginTop : '-30%'}}>
            <MDBCardBody>
            <MDBCardTitle>Manual Attendance</MDBCardTitle>
                <MDBCardText>
Manually search for student & add attendance


                </MDBCardText>


</MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const ViewArticlesWrapper = withTracker(props => {
  const id = props.id;
  const status2 = Meteor.subscribe("get.classes");
  const status = Meteor.subscribe("get.students");
  const status3 = Meteor.subscribe("get.attendance", id);
  const Attend = Attendance.find({}).fetch();
  let parsedD;
  const data = Classe.findOne({ _id: id });
let graphData = [];
  if(Attend && data){
    let total = data.studentList ? data.studentList.length : 0;
    parsedD = parseData(Attend,total);
    parsedD.map(a => graphData.push({x :a.counter , y :  a.ratio}))
  }
  let students = [];
  if (data && data.studentList) {
    students = Student.find({ _id: { $in: data.studentList } }).fetch();
  }

  const ready = status2.ready();
  return {
    data,
    ready,
    students,
    graphData,
    Attend,
    parsedD,
    ...props
  };
})(Class);

export default ViewArticlesWrapper;


const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
  const groupByKey = groupBy("counter");

function parseData(data, total){
  let key = "counter";
  const result = data.reduce(function (r, a) {
    r[a.counter] = r[a.counter] || [];
    r[a.counter].push(a);
    return r;
}, Object.create(null));

console.log(result);
let arr = [];

Object.keys(result).map(key => {
  arr.push({counter : key, attended : result[key].length, absent : total- result[key].length, date : result[key][0].date, ratio : (result[key].length*100)/total })

});
console.log(arr);
return arr;
}
