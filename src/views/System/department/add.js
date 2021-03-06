import React from 'react';

// ant design
import { Form, Input, InputNumber, Radio, Button, message } from 'antd';
// api
import { AddDepartment, GetDetails, UpdateDetails } from '../../../api/department';

class DepartmentAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: "",
      formLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      }
    };
  }
  formRef = React.createRef();

  UNSAFE_componentWillMount() {
    if (this.props.location.state) {
      this.setState({ id: this.props.location.state.id });
    }
  }
  
  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    if(!this.props.location.state) { return false; }
    GetDetails({_id: this.state.id}).then(response => {
      this.formRef.current.setFieldsValue(response);
    })
  }

  onSubmit = (value) => {
    if(!value.name) {
      message.warning("Name is required");
      return false;
    }
    if(!value.number) {
      message.warning("Number is required");
      return false;
    }
    this.setState({
      loading: true,
    })

    this.state.id ? this.onEdit(value) : this.onAdd(value);

  }

  onAdd = (value) => {
    AddDepartment(value).then(response => {
      if (response.resCode === 0) {
        message.success(response.message);
        this.setState({
          loading: false,
        });
        this.formRef.current.resetFields();
      } else {
        this.setState({
          loading: false,
        });
        message.error(response.message);
      }
    }).catch(error => {
      this.setState({
          loading: false,
      });
    });
  }

  onEdit = (value) => {
    UpdateDetails({id: this.state.id, data: value}).then(response => {
      if (response.resCode === 0) {
        message.success(response.message);
        this.setState({
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
        message.error(response.message);
      }
    }).catch(error => {
      this.setState({
          loading: false,
      });
    });
  }

  onReset = () => {
    this.formRef.current.resetFields();
  }

  render() {
    return (
        <Form 
        ref = {this.formRef}
        onFinish={this.onSubmit}
        initialValues={{number: 10, status: true}}
        {...this.state.formLayout}
        >
          <Form.Item required label="department name" name="name">
            <Input />            
          </Form.Item>
          <Form.Item required label="population" name="number">
            <InputNumber min={0} max={200}/>            
          </Form.Item>
          <Form.Item label="Ban" name="status">
            <Radio.Group>
              <Radio value={true}>Enable</Radio>
              <Radio value={false}>Disable</Radio>
            </Radio.Group>        
          </Form.Item>
          <Form.Item label="Description" name="content">
            <Input.TextArea />            
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>    
            <Button htmlType="button" onClick={this.onReset}>
              Reset
            </Button>        
          </Form.Item>
        </Form>
       
    )
  }
}

export default DepartmentAdd;