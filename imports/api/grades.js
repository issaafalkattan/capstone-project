import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Classes = new Mongo.Collection('classes');


export const Classe = Class.create({
  name: 'Classe',
  collection: Classes,
  fields: {
   name :{
      type : String,

  },
  studentList : {
      type : [String],
      optional : true,
  },
  schedule :{
    type : [String],
  
  },
  allowedNumber : {
      type : Number,
  },
  teacherId : {
    type : String,
  },
  classCounter : {
    type : Number,
    default : 0
  }
}
});

