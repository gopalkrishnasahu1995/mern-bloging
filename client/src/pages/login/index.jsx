import React from 'react'
import {Row,Col} from 'antd'

const Login = () => {
    return (
        <Row gutter={24}>
            <Col span={24}> login page </Col>
            <form className="login-page">
                <input type="text" placeholder="Enter Name" />
                <input type="text" placeholder="Enter Password" />
                <input type="email" placeholder="Enter mail id" />
                <input type="number" placeholder="Enter mobile num" />
                <input type="button" value="login"/>
            </form>
        </Row>
    )
}

export default Login
