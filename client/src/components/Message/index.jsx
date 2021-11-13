// import React from "react";
// import { useSelector } from "react-redux";
// import React, {Propt} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Notifications from "react-notification-system-redux";

const Notification = (props) => {
    console.log(props)
    // const notification = useSelector((state) => state.notifications);
    const { notifications } = props
    const style = {
        NotificationItem: {
            DefaultStyle: {
                margin: "10px 5px 2px 1px",
            },
            success: {
                color: "green",
                // backgroundColor:'#4FB64B'
            },
            error: {
                color: "red",
                // backgroundColor:"#ff0505"
            }
        },
    };
    return <Notifications notifications={notifications} style={style} />;
};

// export default Notification;


Notification.propTypes = {
    store: PropTypes.object,
    notifications: PropTypes.array
};


export default connect(
    state => ({ notifications: state.notifications })
)(Notification);