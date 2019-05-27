import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Students = new Mongo.Collection('Students');


export const Student = Class.create({
  name: 'Student',
  collection: Students,
  fields: {
  username : {
      type : String,
  },
   fname : {
       type : String,
   },
   lname : {
       type : String,
   },
   email : {
       type : String,
   },
   accountId : {
       type : String,
   },
   createdBy : {
       type : String,
   }
  

  // will add teacher id in a later phase
  },
});

