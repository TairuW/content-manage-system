import React, { Fragment } from 'react';

import "../../../styles/main.scss";

import { Table, Input, Space, Switch, Button } from 'antd';

import { AudioOutlined } from '@ant-design/icons';

// api 
// import { getList } from '../../../api/department';

const { Search } = Input;

class DepartmentIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      // config
      pageNumber: 1,
      pageSize: 10,
      // Table content
      data: [
        {
          name: '1',
          number: 32,
          status: false
        },
        {
          name: '2',
          number: 42,
          status: false
        },
        {
          name: '3',
          number: 32,
          status: true
        },
      ],
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
                <Button type="primary">Modify</Button>
                <Button>Delete</Button>
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

    // getList(requestData).then(response =>{
    //   const responseData = response.data.data
    //   if (responseData) {
    //     this.setState({data: response.data})
    //   }
    // })
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
    console.log("okay");
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
      </Fragment>
       
    )
  }
}

export default DepartmentIndex;