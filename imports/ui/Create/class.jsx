import React, { Component } from 'react'
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message, InputNumber
  } from 'antd';
export class CreateClasse extends Component {
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
            Meteor.call('create.class', values, (err) => {
                if(err){
                    message.error(err.message);
                }
                else message.success("Class Created!");
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
          label="Class Name"
        >
          {getFieldDecorator('name', {
                       rules: [{ required: true, message: 'Please input Class name!', whitespace: true }],

          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Schedule" {...tailFormItemLayout}>
          {getFieldDecorator('schedule', {
            rules: [{ required: true, message: 'Please fill in Schedule!' }],

          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={8}>
                  <Checkbox value="Monday">Monday</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox  value="Tuesday">
                    Tuesday
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Wednesday">Wednesday</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Thursday">Thursday</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Friday">Friday</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>,
          )}
        </Form.Item>
        <Form.Item label="Number of Allowed Absences">
          {getFieldDecorator('allowedNumber', 
 { initialValue: 3,   rules: [{ required: true, message: 'Please fill in allowed number of absences!'}] })(<InputNumber min={1} max={20} />)}
          <span className="ant-form-text"> absences</span>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
        </Form>
      </div>
    )
  }
}

 const WrappedRegistrationForm = Form.create({ name: 'createClasse' })(CreateClasse);

 export default WrappedRegistrationForm;