import {Attendance } from '../imports/api/attendance';
import { Classe } from '../imports/api/classes';
import { Student } from '../imports/api/student';


Meteor.publish('get.classes', () => {
  return Classe.find({teacherId : Meteor.userId()});
});
Meteor.publish('get.users', () => {
  return Meteor.users.find({});
});
Meteor.publish('get.students', () => {
  return Student.find({ createdBy : Meteor.userId()})
})
Meteor.publish('get.attendance', (id) => {
  return Attendance.find({classId : id})
})
