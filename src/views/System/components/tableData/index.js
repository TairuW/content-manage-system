// import React, { Component } from 'react'
// import { Table } from 'antd';
// import { ListDepartment } from '@api/department';

// class TableComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: [],
//         }
//     }

//     componentDidMount() {
//         this.LoadData();
//     }

//     LoadData = () => {
//         ListDepartment().then(response =>{
//           if (response) {
//             this.setState({data: response})
//           }
//         })
//     }
//     render() {
//         const { columns } = this.props;
//         return (
            
//             <Table rowKey="name" columns={columns} dataSource={this.state.data}/>
//         )
//     }
// }

// export default TableComponent;
