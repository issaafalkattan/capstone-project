import React, { Component } from "react";
import { Menu, Icon, Button, Layout, Avatar } from "antd";
import { withTracker } from "meteor/react-meteor-data";
const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;
import "antd/dist/antd.css";
import { Link } from "@reach/router";
import MenuItem from "antd/lib/menu/MenuItem";

export class Sidebar extends Component {
  render() {
    console.log(Roles.userIsInRole(Meteor.userId(), "teacher"));
    return (
      <Sider collapsible>
        <div className="logo" />
        {Roles.userIsInRole(Meteor.userId(), "teacher") ? (
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <div class="sidebar-section sidebar-user clearfix">
              <div class="sidebar-user-avatar">
              <Avatar style={{ backgroundColor: '#87d068' }} size="small" icon="user" />    {this.props.user ? this.props.user.username : 'NA'} </div>


           
          
            </div>
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="home" />
                Home
              </Link>
            </Menu.Item>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="book" />
                  <span>Classes</span>
                </span>
              }
            >
              <Menu.Item key="6">
                <Link to="create-class">
                  <Icon type="edit" />
                  Create Class
                </Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/view-classes">
                  <Icon type="diff" />
                  View Classes
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="11">
              <Link to="/view-students">
                <Icon type="usergroup-add" />
                View Students
              </Link>
            </Menu.Item>
           
            <Menu.Item>
              <Button
                onClick={() => {
                  Meteor.logout();
                  location.reload();
                }}
              >
                {" "}
                Log Out{" "}
              </Button>
            </Menu.Item>
          </Menu>
        ) : (
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Users</span>
                </span>
              }
            >
              <Menu.Item key="1">
                <Link to="create-user">Create User</Link>
              </Menu.Item>
              <Menu.Item key="2">
                {" "}
                <Link to="view-users">View Users</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item>
              <Button
                onClick={() => {
                  Meteor.logout();
                  location.reload();
                }}
              >
                {" "}
                Log Out{" "}
              </Button>
            </Menu.Item>
          </Menu>
        )}
      </Sider>
    );
  }
}

const ListPageContainer = withTracker(({ id }) => {
  const status = Meteor.subscribe("_roles");
  const status2 = Meteor.subscribe('get.users');
  const user = Meteor.users.findOne({_id : Meteor.userId()});
  const ready = status.ready();
  return {
    ready,
    user
  };
})(Sidebar);

export default ListPageContainer;
