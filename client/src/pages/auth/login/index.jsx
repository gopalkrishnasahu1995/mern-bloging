import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Divider, Image, PageHeader } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.scss'
import LogImg from '../../../assets/images/support-team.svg'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};


const Login = () => {
    return (
        <Form {...formItemLayout}>
            <Row className={styles.login} gutter={24}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Row gutter={24}>
                        <Col span={24}>
                            <PageHeader
                                className="site-page-header"
                                title="Login" />
                            <Form.Item label='Username'
                                hasFeedback
                                name='username'
                                rules={[{ required: true, message: 'Please enter your fullName' }]}>
                                <Input placeholder='Enter Your Name'
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='Password'
                                name="password"
                                hasFeedback
                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input.Password type="password"
                                    placeholder="Password"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                />
                            </Form.Item>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button className='btn'
                                type="primary"
                                htmlType="submit"
                            >
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Divider type='vertical' className={styles.log_divider} />
                <Col xs={24} sm={24} md={12} lg={11} xl={11}>
                    <Image width={400}
                        alt='login'
                        height={400}
                        preview={false}
                        src={LogImg}
                    />
                </Col>

            </Row>
        </Form>
    )
}

export default Login
