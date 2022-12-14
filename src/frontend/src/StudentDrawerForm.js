import apiClient from "./api";

import {Drawer, Input, Col, Select, Form, Row, Button} from 'antd';
import { useState } from "react";

import { successNotification, errorNotification } from "./Notification";

const {Option} = Select;


function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudents}) {
    const onCLose = () => setShowDrawer(false);

    const [submitting, setSubmitting] = useState(false);

    const addNewStudent = async (student) => {
        try {
            const response = await apiClient.post("/students", student, {
                headers: {
                  // 'application/json' is the modern content-type for JSON, but some
                  // older servers may use 'text/json'.
                  // See: http://bit.ly/text-json
                  'content-type': 'application/json'
                }
            });
            onCLose();
            successNotification(
                `${response.status}: Student successfully added`,
                `${student.name} was added`);
            fetchStudents();
        } catch (error) {
            errorNotification("There was an error", 
            `${error.response.data.message} 
                [statuscode: ${error.response.data.status}] 
                [error:${error.response.data.error}]`
            )
        }
        setSubmitting(false);
    };

    const onFinish = student => {
        setSubmitting(true);
        addNewStudent(student);
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new student"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter student email'}]}
                    >
                        <Input placeholder="Please enter student email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" loading={submitting}>
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Drawer>
}

export default StudentDrawerForm;