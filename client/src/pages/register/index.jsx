import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Divider, Image } from 'antd';
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import * as RegisterAction from './registerActions'
import RegImg from '../../assets/images/remote-team.svg'

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

const RegisterPage = (props) => {
    const [form] = Form.useForm()

    const registerData = useSelector((state) => state.register)
    const dispatch = useDispatch()

    const onFinish = (values) => {
        let name, account, password;
        name = values.username;
        account = values.account;
        password = values.password
        dispatch(RegisterAction.Register(name, account, password));
        console.log(values)
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
                                <Input placeholder='Enter Your Name'/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='account'
                                name='account'
                                tooltip="please enter either email or phone no."
                                hasFeedback
                                rules={[{ required: true, message: 'Please input your email or Phone No.' }]}>
                                <Input placeholder="enter your email or phone No." />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='password'
                                name="password"
                                hasFeedback
                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input.Password type="password"
                                    placeholder="Password"
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
                <Divider type='vertical' className={styles.reg_divider}/>
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

export default RegisterPage