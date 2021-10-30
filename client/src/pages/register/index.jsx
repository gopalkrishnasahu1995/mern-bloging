import React, { useState } from 'react'
import { Row, Col, Input, Button } from 'antd'
// import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import * as RegisterAction from './registerActions'

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registerData = useSelector((state) => state.register)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(RegisterAction.Register(name, email, password));
    };
    return (
        <Row gutter={24}>
            <Col span={24}>Register Page</Col>
            <Col span={8}>
                <label htmlFor="email">username</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email">email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">password</label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} />
            </Col>
            <Col span={24}>
                <Button onClick={handleSubmit}>submit</Button>
            </Col>
        </Row>
    )
}

export default RegisterPage
