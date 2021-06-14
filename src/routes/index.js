import {
    DesktopOutlined,
    FileOutlined,
    IdcardOutlined,
    PieChartOutlined,
    TeamOutlined,
} from '@ant-design/icons';

const routes = [
    { 
        title: 'Console',
        icon: '',
        prefix: <DesktopOutlined/>,
        key: '/system',
    },
    { 
        title: 'User Management',
        icon: '',
        prefix: <IdcardOutlined/>,
        key: '/system/user',
        child: [
            {key: '/system/user/index', title: 'Users', icon: ''},
            {key: '/system/user/add', title: 'Add User', icon: ''},
        ]
    },
    { 
        title: 'Departments Management',
        icon: '',
        prefix: <TeamOutlined/>,
        key: '/system/department',
        child: [
            {key: '/system/department/index', title: 'Departments', icon: ''},
            {key: '/system/department/add', title: 'Add Department', icon: ''},
        ]
    },
    { 
        title: 'Position Management',
        icon: '',
        prefix: <FileOutlined/>,
        key: '/system/position',
        child: [
            {key: '/system/position/index', title: 'Positions', icon: ''},
            {key: '/system/position/add',  title: 'Add Position', icon: ''},
        ]
    },
    { 
        title: 'Ask for leave',
        icon: '',
        prefix: <PieChartOutlined/>,
        key: '/system/leave',
    },
    { 
        title: 'Overtime',
        icon: '',
        prefix: <PieChartOutlined/>,
        key: '/system/overtime',
    },
]

export default routes;