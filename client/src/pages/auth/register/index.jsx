import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Divider, Image } from 'antd';
import styles from './index.module.scss'
import { connect } from 'react-redux';
import RegImg from '../../../assets/images/remote-team.svg'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import actions from '../../../redux/actions';
import { formItemLayout } from './constants'

const RegisterPage = ({ registerState, registerAction }) => {
    const [form] = Form.useForm()
    const { error, loading, userInfo, success, data } = registerState
    const onFinish = (values) => {
        let name, account, password;
        name = values.username;
        account = values.account;
        password = values.password
        registerAction(name, account, password)
    }

    return (
        <Form {...formItemLayout} form={form}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row className={styles.reg} gutter={30}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item label='username'
                                hasFeedback
                                name='username'
                                rules={[{ required: true, message: 'Please enter your fullName' }]}>
                                <Input placeholder='Enter Your Name'
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='account'
                                name='account'
                                tooltip="please enter either email or phone no."
                                hasFeedback
                                rules={[{ required: true, message: 'Please input your email or Phone No.' }]}>
                                <Input placeholder="enter your email or phone No."
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='password'
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
                            <Form.Item shouldUpdate
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}>
                                {() => (
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        disabled={
                                            !form.isFieldsTouched(true) ||
                                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                        }
                                    >
                                        Register
                                    </Button>
                                )}
                            </Form.Item>

                        </Col>
                    </Row>
                </Col>
                <Divider type='vertical' className={styles.reg_divider} />
                <Col xs={24} sm={24} md={12} lg={11} xl={11}>
                    <Image width={400}
                        alt='signup'
                        height={400}
                        preview={false}
                        src={RegImg}
                    />
                </Col>
            </Row>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
        registerState: state.registerState,
    };
};

export default connect(mapStateToProps, actions)(RegisterPage);
