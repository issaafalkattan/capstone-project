import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Users = new Mongo.Collection('accounts');


export const User = Class.create({
  name: 'User',
  collection: Users,
  fields: {
    fname: {
      type: String,
      label: 'fname',
    },
    lname: {
      type: String,
      label: 'lname',
    },
    username: {
      type: String,
      label: 'username',
    },
    password: {
      type: String,
      label: 'password',
    },
    enabled: {
      type: Boolean,
     default : true,
    },
    role: {
      type: String,
    },
    accountId :{
        type : String,
    }
  },
});

