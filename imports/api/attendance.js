import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Attendances = new Mongo.Collection('attendances');


export const Attendance = Class.create({
  name: 'Attendance',
  collection: Attendances,
  fields: {
  classId :{
      type : String,

  },
  date :{
       type : Date,
   },
   studentId :{
       type : String,
   },
   counter :{
       type : Number,
   }
  },
});

