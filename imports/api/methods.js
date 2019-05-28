import { Classe } from "./classes";
import { Student } from "./student";
import { Attendance } from "./attendance";
import moment from 'moment'
Meteor.methods({
  "create.class"(data) {
    let course = new Classe(data);
    course.teacherId = Meteor.userId();
    course.save();
  },
  "create.user"(data) {
    let id = Accounts.createUser({
      username: data.username,
      password: data.password
    });
    Roles.addUsersToRoles(id, ["teacher"]);
  },
  "create.student"(data) {
    let id = Accounts.createUser({
      username: data.username,
      password: `${data.fname}2019${data.lname}`
    });
    Roles.addUsersToRoles(id, ["student"]);
    let st = new Student(data);
    st.accountId = id;
    st.createdBy = Meteor.userId();
    st.save();
    Meteor.call("sendEmailPassword", {
      email: data.email,
      password: `${data.fname}2019${data.lname}`,
      username: data.username
    });
  },
  "reset.password"(data) {
    Accounts.setPassword(data.userId, data.newPassword);
  },
  "remove.user"(id) {
    Meteor.users.remove({ _id: id });
  },
  "add.to.class"(classes, students) {
    classes.map(classId => {
      let cl = Classe.findOne({ _id: classId });
      let previous = cl.studentList || [];
      students.map(student => {
        if (!previous.includes(student)) {
          previous.push(student);
        }
      });
      cl.studentList = previous;
      cl.save();
    });
  },
  "increment.counter"(id) {
    let cl = Classe.findOne({ _id: id });
    let old = cl.classCounter || 0;
    old++;
    cl.classCounter = old;
    cl.save();
  },
  "mark.attendance"(data) {
    //check if it already exists

    let a = Attendance.findOne({
      counter: parseInt(data.counter),
      classId: data.classId,
      studentId: data.studentId
    });
    console.log(a);
    if (a) {
      console.log(" one exists", a);
      return false;
    } else if (a == undefined) {
      //check if valid 
      let clas = Classe.findOne({_id : data.classId});
      let today = new Date().getDay();
      console.log(data.studentId)
      let st = Student.findOne({accountId : data.studentId});
      console.log(st);
      if(st){
        console.log("found student")
      if(clas.classCounter == parseInt(data.counter) && today ==  parseInt(data.day)){
        console.log("Values are true");
        let atten = new Attendance();
        atten.classId = data.classId;
        atten.studentId = data.studentId;
        atten.counter = parseInt(data.counter);
        atten.date = new Date();
        atten.save();
        return true;
      }
      else { 
        console.log("NOT EQUAL")
      return false;
      }
    }
    else {
      console.log("NO ST FOUND")
      return false;
    }
      
    }
  },
  "remove.from.class"(list, id) {
    let cl = Classe.findOne({ _id: id });

    let temp = cl.studentList;
    for (var i = 0; i < temp.length; i++) {
      for (var j = 0; j < list.length; j++) {
        if (temp[i] === list[j]) {
          Attendance.remove({ studentId: temp[i], classId: id });

          temp.splice(i, 1);
        }
      }
    }

    cl.studentList = temp;
    cl.save();
  },

  "delete.class"(id) {
    let cl = Classe.remove({ _id: id });
    Attendance.remove({ classId: id });
  },
  "danger.zone"() {
    const dangerZone = [];

    const students = Student.find({ createdBy: Meteor.userId() }).fetch();
    students.map(a => {
      const allClasses = Classe.find({
        teacherId: Meteor.userId(),
        studentList: a._id
      });
      allClasses.map(cl => {
        const totalAttend = Attendance.find({ classId: cl._id }).fetch();
        let counters = [];
        totalAttend.map(at => {
          if (!counters.includes(at.counter)) {
            counters.push(at.counter);
          }
        });
        const studentAttend = Attendance.find({
          studentId: a.accountId,
          classId: cl._id
        }).count();
        if (studentAttend < counters.length / 2) {
          dangerZone.push({
            studentId: a._id,
            classId: cl._id,
            absence: counters.length - studentAttend
          });
        }
      });
    });
    return dangerZone;
  },

  "get.attedance.dates"(id) {
    console.log(id);
    const atten = Attendance.find({ classId: id }).fetch();
    const clas = Classe.findOne({ _id: id }).studentList.length || 0;
    console.log(clas);
    let counters = [];
    atten.map(a => {
      if (!counters.includes(a.counter)) {
        counters.push(a.counter);
      }
    });

    let data = [];
    counters.map(a => {
      let att = Attendance.find({ classId: id, counter: a }).count();
      data.push({
        date: Attendance.findOne({ classId: id, counter: a }).date,
        count: (att * 100) / clas,
        title: `${(att * 100) / clas}% attended`
      });
    });
    return data;
  }, 
  "get.attendance.class"(id, classId) {
    console.log(id, classId);
    const atten = Attendance.find({ classId: classId }).fetch();
    let counters = [];
    atten.map(a => {
      if (!counters.includes(a.counter)) {
        counters.push(a.counter);
      }
    });
    let data = [];
    const stu = Student.findOne({_id : id});
    
    console.log("Counters are", counters)
    counters.map(count => {
      const stAtt = Attendance.findOne({classId  : classId, studentId : stu.accountId, counter : count});
      console.log("the stats", stAtt)
       if(stAtt){
         data.push({status : "Present", date : moment(stAtt.date).toDate("DD/MM/YYYY")})
       }
       else {
         let notAtt = Attendance.findOne({classId  : classId, counter : count});
        data.push({status : "Absent", date :  moment(notAtt.date).toDate("DD/MM/YYYY")})

       }
    })
    console.log('daTAAA', data)
    return data;
  },
  "delete.student"(id) {
    let stu = Student.findOne({_id : id});
    Meteor.users.remove({_id : stu.accountId});
     Student.remove({_id : id});
     Attendance.remove({studentId : id});
     let clam = Classe.find({studentList : id}).fetch();
     clam.map(cla => {
      let temp = cla.studentList || [];

      for(let i =0; i< temp.length ; i++){
        if(temp[i] == id){
         temp.splice(i, 1);
 
        }
      }
      
      cla.studentList = temp;
      cla.save();
     })
     
  }
});
