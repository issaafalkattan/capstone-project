import React, { Component } from 'react';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
const {
  Header, Content, Footer, Sider,
} = Layout;
import { withTracker } from 'meteor/react-meteor-data';
import ViewStudents from './View/student';
import { Router, Link } from "@reach/router";
import Dashboard from './Dashboard';
import Sidebar from './sidebar';
import CreateClass from './Create/class';
import CreateUser from './Create/users';
import ViewClasses from './View/classes';
import QrCode from './generateQr';
import ViewUsers from './View/users';
import Class from './Class';
import StudentClass from './Student';
class App extends Component {
  render(){
    return (
      <Layout style={{ minHeight: '100vh' }}>
       <Sidebar />
        <Layout>
          <Content style={{margin : "0"}}>
            {Roles.userIsInRole(Meteor.userId(), 'teacher') ? 

           <Router>

             <Dashboard path="/" default />
              <CreateClass path="/create-class" />
              <ViewClasses path="/view-classes" />
              <ViewStudents path="/view-students" />
             <QrCode path="/qr/:id" />
             <Class path="/class/:id" />
            <StudentClass path="/student/:id" />
           </Router>
           : 
           <Router>
           <CreateUser path="/create-user" />
           <ViewUsers path="/view-users" default/>
    </Router> }
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Classify ©2019 
          </Footer>
        </Layout>
      </Layout>

 
    )
  }
}

const ListPageContainer = withTracker(({ id }) => {
  const status = Meteor.subscribe('_roles');
  const ready = status.ready();
  return {
   ready,
  };
})(App);

export default ListPageContainer;