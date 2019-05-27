import React, { Component } from 'react'
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message
  } from 'antd';
export class CreateUser extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            Meteor.call('create.user', values, (err) => {
                if(err){
                    message.error(err.message);
                }
                else message.success("User Created!");
            })
          }
        });
      }
    
      handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }
    
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
    return (
      <div style={{            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
    }}>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label="Username"
        >
          {getFieldDecorator('username', {
                       rules: [{ required: true, message: 'Please input username!', whitespace: true }],

          })(
            <Input />
          )}
                  </Form.Item>

           <Form.Item
          label="Password">
           {getFieldDecorator('password', {
                       rules: [{ required: true, message: 'Please input password!', whitespace: true }],

          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
        </Form>
      </div>
    )
  }
}

 const WrappedRegistrationForm = Form.create({ name: 'createUser' })(CreateUser);

 export default WrappedRegistrationForm;