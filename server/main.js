import '../imports/api/methods';
import './publish'
import { Email } from 'meteor/email' 
import {ExcelFiles} from '../imports/api/files'
import XLSX from 'xlsx';
Meteor.methods(
  {
    sendEmailPassword: function (data) {
  
      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();
      Email.send({
        to: data.email,
     from: 'classify.infomation@gmail.com',
          subject: 'Welcome to Classify ' + data.username +  '!',
          text: "Congrats " + data.username + "! An account as been created for you! Please use your username and the password " + data.password + " to login on the mobile app! You may change the password from the app!",
      });      

  },

  processExcel : function(id) {
    console.log("ID IS", id);
    let fileLink = ExcelFiles.findOne({_id : id}).link();
    console.log(fileLink);
    HTTP.get(fileLink, {responseType: 'arraybuffer'}, function(error, result) {
      let data = new Uint8Array(result.content);
      let arr = new Array();
      for(let i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      let bstr = arr.join("");
    
      let workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      let sheet = workbook.Sheets[first_sheet_name];
      let parsed = XLSX.utils.sheet_to_json(sheet);
      console.log(parsed)
      parsed.map(a => {
        Meteor.call('create.student', a);
      })
    });
    
  }
  }
);
Meteor.startup(() => {
  console.log("started and sent");
   smtp = {
    username: 'classify.infomation',   // eg: server@gentlenode.com
    password: 'classify2019',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 25
  }
 
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  


  if (Meteor.users.find({}).count() === 0) {
      console.log("Default users created successfully");

      var users = [
        {username:"instructor",roles:['teacher']},
        {username:"admin", roles:['admin']}
      ];
  
  users.map(user => {
    var id;
  
    id = Accounts.createUser({ 
      username: user.username, 
      password: "capstone", 
    });
  
    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles);
    }});
  
  }
    
      
    }); 
  