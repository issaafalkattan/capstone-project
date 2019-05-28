import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Classe } from "../api/classes";
import { Student } from "../api/student";
import { Card, Spin } from "antd";
class Attendance extends Component {
 state={
   valid : 'idk'
 }

 componentDidCatch(){
   console.log("FREAKING HERE")
  
 }

componentDidMount(){
  console.log("mounted")
  Meteor.call("mark.attendance", { classId : this.props.class, studentId : this.props.id, counter : this.props.counter, day : this.props.day}, (err, res) => {
    if(err){
      this.setState({valid : false})

      console.log(err)
    }
    else {
      if(res == false){
        console.log("RES IS WRONG")
        this.setState({valid : false})
      }
      if(res == true){
        this.setState({valid : true})
      }
    }
  });
}

 
  render() {
    return (
      <div style={{background : 'black', color : '#00F1C5', textAlign : 'center', minHeight : '100vh', width : '100%'}}>
    
    
        {this.state.valid == false ? (
          <h3 style={{color : '#00F1C5'}}> Request invalid. Attendance is not marked.</h3>
        ) : this.state.valid == true ? (
          <h3 style={{color : '#00F1C5'}}>
            Attendance for {this.props.student ? this.props.student.username : <Spin />}
             <br />
             for class {this.props.data ? this.props.data.name : <Spin />} has been marked!
            <img src="/checkbox.gif" style={{ maxWidth : '100vw'}}/>
          </h3>
        ) : (
          <Spin />
        )}
      </div>
    );
  }
}

const ViewArticlesWrapper = withTracker(props => {
  const status = Meteor.subscribe("get.students");
  const status2 = Meteor.subscribe("get.classes");
  const classId = props.class;
  const id = props.id;
  const day = props.day;
  const counter = props.counter;
  console.log(id);
 const student = Student.findOne({accountId : id});
 const data = Classe.findOne({_id : classId})
const ready = status.ready() && status2.ready();


  return {
    data,
    ready,
    student,
    ...props
  };
})(Attendance);

export default ViewArticlesWrapper;
