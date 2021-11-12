import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Divider, Image } from 'antd';
import resetImg from '../../../assets/images/reset.svg'

const ResetPassword = () => {
    return (

        <Row gutter={24}>
            <Col span={24}>

            </Col>
            <Col span={24}>
                <Row gutter={24}>
                    <Col span={24}>
                        <Image width={400}
                            alt='resetpassword'
                            height={400}
                            preview={false}
                            src={resetImg}
                        />
                    </Col>
                    <Col span={24}>
                    Reset your password?
                    </Col>
                    <Col span={24}>
                    We received a request to reset your password.
            If you didn't make this request, simply ignore this email.
                    </Col>
                </Row>
            </Col>
            <Divider/>
            <Col span={24}>
            If you did make this request just click the button below:
            </Col>
            <Col span={24}>
            
            </Col>
        </Row>



    )
}

export default ResetPassword

