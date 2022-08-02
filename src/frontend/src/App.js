import { useState, useEffect} from "react";
import StudentDrawerForm from "./StudentDrawerForm";
import { errorNotification, successNotification } from "./Notification";
import './App.css';
import {
    EditOutlined,
    DeleteOutlined,
    DesktopOutlined,
    HeartTwoTone,
    PieChartOutlined,
    PlusOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { 
    BackTop,
    Badge,
    Breadcrumb, 
    Button, 
    Col,
    Empty, 
    Layout, 
    Menu,
    Spin, 
    Table,
    Tag,
    Row,
    Avatar,
    Space,
    Popconfirm
 } from 'antd'

import apiClient from "./api";

const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>} />
    }
    const names =trim.split(" ");
    if (names.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>{`${name.charAt(0)}${name.charAt(name.length-1)}`}</Avatar>
};

const { Header, Content, Footer, Sider } = Layout;

const removeStudent = async (studentId, callback) => {
    try {
        await apiClient.delete(`students/${studentId}`);
        successNotification( "Student deleted", `Student with ${studentId} was deleted`);
        callback();
    } catch (error) {
        errorNotification("There was an error", 
            `${error.response.data.message} 
                [statuscode: ${error.response.data.status}] 
                [error:${error.response.data.error}]`
            )
    }
}

const columns = fetchStudents => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) => <TheAvatar name={student.name}/>
    },
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
    {
        title: 'Actions',
        key: 'actions',
        render: (text, student) => <Space>
                <Button type="primary" icon={<EditOutlined />} >
                    Edit
                </Button>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete ${student.name}`}
                    onConfirm={() => removeStudent(student.id, fetchStudents)}
                    okText='Yes'
                    cancelText='No'>
                    
                    <Button type="primary" danger icon={<DeleteOutlined />} >
                        Delete
                    </Button>
                </Popconfirm>
            </Space>
    },
];

function App() {
    const [ students, setStudents] =  useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const year = new Date().getFullYear();
    const fetchStudents = async () => {
        try {
            const response = await apiClient.get("/students");
            setStudents(response.data);
        } catch (error) {
            errorNotification("There was an error", 
            `${error.response.data.message} 
                [statuscode: ${error.response.data.status}] 
                [error:${error.response.data.error}]`
            )
        }
        setFetching(false);
    };
    
    useEffect(() => {
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if(fetching){
            return <Spin size="large" />
        }
        if(students.length <= 0) {
            return  <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Student
                </Button>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Empty />
            </>
        }
        return <>
                    <StudentDrawerForm
                        showDrawer={showDrawer}
                        setShowDrawer={setShowDrawer}
                        fetchStudents={fetchStudents}
                    />
                    <Table
                        dataSource={students}
                        columns={columns(fetchStudents)}
                        title={() =>
                            <> 
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col className="gutter-row" span={12}>
                                        <Tag style={{marginLeft: "0.5rem"}}>Number of students</Tag>
                                        <Badge count={students.length} className="site-badge-count-4"/>
                                    </Col> 
                                    <Col className="gutter-row" span={12}>
                                        <Button 
                                            onClick={() => setShowDrawer(!showDrawer)}
                                            type="primary" shape="round" icon={<PlusOutlined />} size="small">
                                            Add Student
                                        </Button>
                                    </Col> 
                                </Row>
                            </>
                        }
                        pagination={{
                            pageSize: 50,
                        }}
                        scroll={{
                            y: 600,
                        }}
                        rowKey={(student => student.id)}
                    />
                    <BackTop />
                </>;
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
                ©{year} Made with <HeartTwoTone  twoToneColor="#eb2f96" /> by
                <Button
                    color=""
                    rel="noopener noreferrer"
                    target="_blank" 
                    href="https://sewaportfolio.web.app"
                    type="link"
                    >
                    Keith
                </Button>
            </Footer>
        </Layout>
    </Layout>
}

export default App;
