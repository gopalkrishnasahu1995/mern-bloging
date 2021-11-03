import React from 'react'
import { Row, Col } from 'antd'
import { Navbar, Button } from '../../components'

const HomePage = () => {
    return (
        <Row gutter={24}>
            <Col span={24}>Home Page</Col>
            <Button>hello</Button>
        </Row>
    )
}

export default HomePage
