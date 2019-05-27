import Login from 'ant-design-pro/lib/Login';
import { Alert, Icon, message } from 'antd';
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
const {
  Tab, UserName, Password, Mobile, Captcha, Submit,
} = Login;
import { navigate } from '@reach/router';
class LoginPage extends React.Component {
  state = {
    notice: '',
    type: 'tab2',
    loading: false,
  }
  onSubmit = (err, values) => {
    if (!err) {
      const { username, password } = values;
      this.setState({ loading: true, notice: null });
      Meteor.loginWithPassword(username, password, (err) => {
        if(err){
          console.log(err);
          message.error(err.reason);
          this.setState({loading : false})
        }
      else 
      {
        location.reload();
      }
      })
    }
    //
  }


  render() {
    return (
      <div className="loginContainer">
        <div className="mainLoginManagement">
          <div style={{ width: '300px' }} >
            <h1 style={{ color: 'white' }}><img src="./logo.png" style={{width : '50px'}}/>Classify</h1>

            <Login
              defaultActiveKey={this.state.type}
              onTabChange={this.onTabChange}
              onSubmit={this.onSubmit}
            >

              {
            this.state.notice &&
            <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
          }
              <UserName name="username" />
              <Password name="password" />


              <Submit style={{ width: '300px' }} loading={this.state.loading}>Login</Submit>

            </Login>
          </div>
        </div>
      </div>


    );
  }
}

export default LoginPage;
