import React, { Fragment } from 'react';

import "../../../styles/main.scss";

import { Table, Input, Space, Switch, Button, Modal, message } from 'antd';

import { AudioOutlined } from '@ant-design/icons';

// api 
import { ListDepartment, DeleteDepartment } from '../../../api/department';

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
      data: [],
      columns: [
        {title:"Department Name", dataIndex:"name", key:"name"},
        {title:"Population", dataIndex:"number", key:"number"},
        {
          title:"Disable",
          dataIndex:"status",
          key:"status",
          render: (text, rowData) => {
            return <Switch checkedChildren="Enable" unCheckedChildren="Disable" defaultChecked={rowData.status}/>
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
                <Button type="primary" onClick={this.showModal}>Modify</Button>
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

  onHandleDelete(id) {
    console.log(id);
    if(!id) { return false; }
    DeleteDepartment({id}).then(response => {
      if (response.resCode === 0){
        message.success(response.message);
        this.LoadData();
      }
    }).catch(error => {

    })
  }

  showModal = () => {
    this.setState({visible: true})
  }

  handleOk = () => {
    this.setState({visible: false})
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  render() {
    const {data, columns} = this.state;
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
        title="Basic Modal" 
        visible={this.state.visible} 
        onOk={this.handleOk} 
        onCancel={this.handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        >
          <p>Some contents...</p>
        </Modal>
      </Fragment>
       
    )
  }
}

export default DepartmentIndex;