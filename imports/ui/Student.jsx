import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Student } from "../api/student";
import { Classe } from "../api/classes";
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
import { Tag, Select, List} from 'antd'
import moment from "moment";
class StudentClass extends Component {
    state= {
        classId : '',
        attendance : [],
    }
    getAttendance = (r) =>{
        Meteor.call('get.attendance.class', this.props.id, r, (err, res) => {
            if(err){
                console.log(err)
            }
            else { 
            
                this.setState({attendance : res});
            }
        })
    }
    getStatus = (status) => {
        if(status == 'Present'){
            return <Tag color="green"> Present </Tag>
        }
        else {
            return <Tag color="red"> Absent </Tag>

        }
    }
  render() {
    return (
        <div>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Student Information</MDBCardTitle>
              <MDBCardText>
                <div class="block-section">
                  <table class="table table-borderless table-striped table-vcenter">
                    <tbody>
                      <tr>
                        <td class="text-right">Name</td>
                        <td>
                          {this.props.data ? this.props.data.fname +  " " + this.props.data.lname : "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">Email</td>
                        <td>
                          {this.props.data
                          ? <a href={`mailto:${this.props.data.email}`} >{this.props.data.email}</a>
                            : "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">Classes</td>
                        <td>
                          {this.props.classs
                            ? this.props.classs.map(a => (
                                <Tag color="geekblue">{a.name}</Tag>
                              ))
                            : "NA"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="6">
        <MDBCard style={{marginTop : '4%'}}>
            <MDBCardBody>
              <MDBCardTitle>Attendance Info</MDBCardTitle>
              <MDBCardText>
   <Select style={{width : '200px'}} onChange={(r) => {
       this.setState({classId : r});
       this.getAttendance(r);
   }
       }>
       {this.props.classs ? this.props.classs.map(a => <Select.Option value={a._id}>{a.name}</Select.Option>) : null}
   </Select>
   <List>
   {this.state.attendance ? this.state.attendance.map(a => 
   <List.Item>{this.props.data ? this.props.data.username : "Student"} was {this.getStatus(a.status)} on {moment(a.date).toDate("DD/MM/YYYY").toDateString()}</List.Item>) : null}
   </List>
              </MDBCardText>
</MDBCardBody>
</MDBCard>
        </MDBCol>
        <MDBCol md="6">
        <MDBCard style={{marginTop : '4%'}}>
            <MDBCardBody>
              <MDBCardTitle>Grades</MDBCardTitle>
              <MDBCardText>
                  Grades will be displayed here <br />
                  ..
              </MDBCardText>
              </MDBCardBody>
              </MDBCard>
              </MDBCol>
      </MDBRow>
      </div>
    );
  }
}

const ViewArticlesWrapper = withTracker(props => {
  const studentId = props.id;
  const status = Meteor.subscribe("get.students");
  const status2 = Meteor.subscribe("get.classes");
  const data = Student.findOne({ _id: studentId });
  const classs = Classe.find({ studentList: studentId }).fetch();
  const ready = status.ready();
  return {
    data,
    ready,
    classs,
    ...props
  };
})(StudentClass);
export default ViewArticlesWrapper;
