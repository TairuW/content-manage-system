import React, { Fragment } from 'react';
import "@styles/main.scss";
// import
import { Link } from 'react-router-dom';
// antd
import { Table, Input, Space, Switch, Button, Modal, message } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
// api 
import { ListDepartment, DeleteDepartment, UpdateStatus } from '@api/department';

const { Search } = Input;

class DepartmentIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      // config
      pageNumber: 1,
      pageSize: 10,
      visible: false,
      confirmLoading: false,
      id: "",
      data: [],
      columns: [
        {title:"Department Name", dataIndex:"name", key:"name"},
        {title:"Population", dataIndex:"number", key:"number"},
        {
          title:"Disable",
          dataIndex:"status",
          key:"status",
          render: (text, rowData) => {
            return <Switch onChange={() => this.onHandleSwitch(rowData._id, !rowData.status)} checkedChildren="Enable" unCheckedChildren="Disable" defaultChecked={rowData.status}/>
          },
        },
        {
          title:"Operation",
          dataIndex:"operation",
          key:"operation", 
          width: 215,
          render: (text, rowData) => {
            return (
              <div className="inline-button">
                <Button type="primary" onClick={() => this.onHandleEdit(rowData._id)}>
                  <Link to={{pathname: './add', state: {id: rowData._id}}}>Edit</Link>
                </Button>
                <Button onClick={() => this.onHandleDelete(rowData._id)}>Delete</Button>
              </div>
            )
          }
        }
      ]
    };
  }
  componentDidMount() {
    this.LoadData();
  }

  LoadData = () => {
    const {pageNumber, pageSize, keyword} = this.state;
    const requestData = {
      pageNumber,
      pageSize,
    }

    if (keyword) {
      requestData.name = keyword;
    }

    ListDepartment(requestData).then(response =>{
      if (response) {
        this.setState({data: response})
      }
    })
  }

  onSearch = (value) => {
    this.setState({
      keyword: value,
      pageNumber: 1,
      pageSize: 10,
    })
    this.LoadData();
  }

  onSelectChange = () => {
  }

  onHandleSwitch(_id, status) {
    if(!_id) { return false; }
    console.log(_id+" "+status);
    UpdateStatus({_id, status}).then(response => {
      message.success(response.message);
      this.LoadData();
    })
  }
  onHandleEdit(id) {

  }

  onHandleDelete(id) {
    if(!id) { return false; }
    this.setState({ 
      visible: true,
      id,
    })
  }

  handleOk = () => {
    this.setState({ confirmLoading: true });
    DeleteDepartment({id: this.state.id}).then(response => {
      if (response.resCode === 0){
        message.success(response.message);
        this.setState({
          visible: false,
          confirmLoading: false,
          id: ""
        })
        this.LoadData();
      }
    }).catch(error => {
      message.error("Failed to delete");
    })
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  render() {
    const {data, columns, visible, confirmLoading} = this.state;
    const rowSelection = {
      onChange: this.onSelectChange
    };
    return (
      <Fragment>
        <Space>
          <Search
          placeholder="Input search text"
          enterButton="Search"
          size="large"
          suffix= {<AudioOutlined style={{ fontSize: 16, color: '#1890ff',}}/>}
          onSearch={this.onSearch}
          />
        </Space>
        <Table 
        rowSelection={rowSelection}
        rowKey="name" 
        dataSource={data}
        columns={columns}
        />
        <Modal 
        title="Info" 
        visible={visible} 
        onOk={this.handleOk} 
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        >
          <p>Are you sure you want to delete this?</p>
        </Modal>
      </Fragment>
       
    )
  }
}

export default DepartmentIndex;