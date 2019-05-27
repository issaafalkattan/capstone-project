import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App'
import '../imports/api/methods';
import './main.css';
import Login from '../imports/ui/Login';
import Attendance from '../imports/ui/attendance';
import { Router, Link } from "@reach/router";

const LoggedRoutes = (
  <Router>

    <App path="/*"/>
    <Attendance path="/attendance/:class/d/:day/c/:counter/s/:id"  />
  </Router>
);

const NotLoggedRoutes = (
  <Router>

    <Login path="/*"/>
    <Attendance path="/attendance/:class/d/:day/c/:counter/s/:id" />
  </Router>
);
Meteor.startup(() => {

  if(Meteor.userId()){
    render(LoggedRoutes, document.getElementById('react-target'));

  }
  else {
    render(NotLoggedRoutes, document.getElementById('react-target'));

  }
});
