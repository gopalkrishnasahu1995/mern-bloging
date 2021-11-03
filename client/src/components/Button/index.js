import React from 'react';
import { Button } from 'antd';

const CustomButton = (props) => {
    const { children } = props
    return (
        <Button>
            {children}
        </Button>
    )
}

export default CustomButton
