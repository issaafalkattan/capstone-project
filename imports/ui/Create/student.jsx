import React, { Component } from 'react'
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message, InputNumber
  } from 'antd';
export class CreateStudent extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            Meteor.call('create.student', values, (err) => {
                if(err){
                    message.error(err.message);
                }
                else {
                    message.success("Student Created!");
                     this.props.close();
                }
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
          label="Student Username"
        >
          {getFieldDecorator('username', {
                       rules: [{ required: true, message: 'Please input Class name!', whitespace: true }],

          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Student First Name"
        >
          {getFieldDecorator('fname', {
                       rules: [{ required: true, message: 'Please input first name!', whitespace: true }],

          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Student Last Name"
        >
          {getFieldDecorator('lname', {
                       rules: [{ required: true, message: 'Please input last name!', whitespace: true }],

          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Student Email"
        >
          {getFieldDecorator('email', {
                       rules: [{ required: true, message: 'Please input email!', whitespace: true }],

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

 const WrappedRegistrationForm = Form.create({ name: 'createStudent' })(CreateStudent);

 export default WrappedRegistrationForm;