import React, { Component } from "react";
import { Classe } from "../api/classes";
import { Student } from "../api/student";
import { withTracker } from "meteor/react-meteor-data";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBBtn,
  MDBContainer,
  MDBRow
} from "mdbreact";
import { Card, Icon, Avatar, List, Select } from "antd";
const { Meta } = Card;
import Calendar from "./Calender";
export class Dashboard extends Component {
  state = {
    dangerZone: [],
    dates: [],
    classId: ""
  };
  componentDidMount() {
    Meteor.call("danger.zone", (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        this.setState({ dangerZone: res });
      }
    });
  }
  getDates = (r) => {
    Meteor.call("get.attedance.dates", r, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ dates: res });
      }
    });
  };
  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard color="blue-gradient" style={{color : 'white'}} text="white">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="6">
                    <h4 style={{ color: "white" }}>
                      {" "}
                      Welcome Back,{" "}
                      <strong>
                        {this.props.user ? this.props.user.username : "NA"}{" "}
                      </strong>
                    </h4>
                    <p> Here are your recent updates : </p>
                  </MDBCol>
                  <MDBCol md="3">
                    <strong style={{ fontSize: "25px", marginLeft: "15%" }}>
                      {this.props.studentCounter
                        ? this.props.studentCounter
                        : "NU"}{" "}
                    </strong>{" "}
                    <br />
                    <Icon
                      type="user-add"
                      size="lg"
                      style={{ color: "#ffff00", fontSize: "26px" }}
                    />{" "}
                    Students{" "}
                  </MDBCol>
                  <MDBCol md="3">
                    <strong style={{ fontSize: "25px", marginLeft: "15%" }}>
                      {" "}
                      {this.props.classCounter ? this.props.classCounter : "NU"}
                    </strong>{" "}
                    <br />
                    <Icon
                      type="book"
                      size="lg"
                      style={{ color: "#ffff00", fontSize: "26px" }}
                    />{" "}
                    Classes
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="3">
            <a href="/view-classes">
              <Card style={{ marginTop: "10%" }}>
                <Meta
                  avatar={
                    <Icon
                      type="book"
                      style={{
                        fontSize: "25px",
                        color: "rgba(205, 220, 57, 0.3)"
                      }}
                      theme="filled"
                    />
                  }
                  title="Manage Classes"
                />
              </Card>
            </a>
          </MDBCol>
          <MDBCol md="3">
            <a href="/view-students">
              <Card style={{ marginTop: "10%" }}>
                <Meta
                  avatar={
                    <Icon
                      type="user-add"
                      style={{
                        fontSize: "25px",
                        color: "rgba(3, 169, 244, 0.3)"
                      }}
                      theme="outlined"
                    />
                  }
                  title="Manage Students"
                />
              </Card>
            </a>
          </MDBCol>
          <MDBCol md="3">
            <Card style={{ marginTop: "10%" }}>
              <Meta
                avatar={
                  <Icon
                    type="sound"
                    style={{
                      fontSize: "25px",
                      color: "rgba(244, 67, 54, 0.3)"
                    }}
                    theme="filled"
                  />
                }
                title="Announcements"
              />
            </Card>
          </MDBCol>
          <MDBCol md="3">
            <Card style={{ marginTop: "10%" }}>
              <Meta
                avatar={
                  <Icon
                    type="idcard"
                    style={{
                      fontSize: "25px",
                      color: "rgba(76, 175, 80, 0.7)"
                    }}
                    theme="filled"
                  />
                }
                title="Grades"
              />
            </Card>
          </MDBCol>
          <MDBCol md="6">
            <MDBCard style={{ marginTop: "2%" }}>
              <MDBCardHeader color="red darken-2">
                Students in Danger Zone
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardText>
                  Students in danger zone are those that have attended less than
                  half the classes.
                  <List>
                    {this.state.dangerZone.map(a => (
                      <List.Item>
                        <strong>
                          {Student.findOne({ _id: a.studentId }).username}
                        </strong>{" "}
                        was absent {a.absence} times for class{" "}
                        {Classe.findOne({ _id: a.classId }).name}{" "}
                        <a
                          href={`mailto:${
                            Student.findOne({ _id: a.studentId }).email
                          }`}
                        >
                          Send Email
                        </a>
                      </List.Item>
                    ))}
                  </List>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6">
            <MDBCard style={{ marginTop: "2%" }}>
              {" "}
              <MDBCardHeader color="purple-gradient">
                {" "}
                Daily Attendance{" "}
                <Select
                  placeholder="Select Class"
                  style={{ width: "200px" }}
                  onChange={r => {this.setState({classId : r});
                  this.getDates(r);
                  }}
                >
                  {this.props.classes
                    ? this.props.classes.map(a => (
                        <Select.Option value={a._id}>{a.name}</Select.Option>
                      ))
                    : null}
                </Select>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardText style={{ textAlign: "center" }}>
                  <Calendar
                    dates={this.state.dates}
                    style={{ marginLeft: "10%" }}
                  />
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
  const classId = props.id;
  const status = Meteor.subscribe("get.students");
  const status2 = Meteor.subscribe("get.classes");
  const status3 = Meteor.subscribe("get.users");
  const user = Meteor.users.findOne({ _id: Meteor.userId() });
  const classCounter = Classe.find({ teacherId: Meteor.userId() }).count();
  const studentCounter = Student.find({ createdBy: Meteor.userId() }).count();
  const classes = Classe.find({ teacherId: Meteor.userId() }).fetch();
  const ready = status.ready();
  return {
    ready,
    user,
    classCounter,
    studentCounter,
    classes,
    ...props
  };
})(Dashboard);

export default ViewArticlesWrapper;
