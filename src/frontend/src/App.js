import { useState, useEffect} from "react";
import './App.css';
import {
    DesktopOutlined,
    FileOutlined,
    HeartTwoTone,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Breadcrumb, Empty, Layout, Menu, Spin, Table } from 'antd'

import apiClient from "./api";


const { Header, Content, Footer, Sider } = Layout;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];

function App() {
    const [ students, setStudents] =  useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    const year = new Date().getFullYear();
    const fetchStudents = async () => {
        try {
            const response = await apiClient.get("/students");
            setStudents(response.data);
            setFetching(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if(fetching){
            return <Spin size="large" />
        }
        if(students.length <= 0) {
            return <Empty />
        }
        return <Table
                    dataSource={students}
                    columns={columns}
                    title={() => 'Students'}
                    pagination={{
                        pageSize: 50,
                    }}
                    scroll={{
                        y: 600,
                    }}
                    rowKey={(student => student.id)}
                />;
    }
    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                ©{year} Made with <HeartTwoTone  twoToneColor="#eb2f96" /> by Keith
            </Footer>
        </Layout>
    </Layout>
}

export default App;
