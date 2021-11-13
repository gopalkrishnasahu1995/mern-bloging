import { success } from 'react-notification-system-redux';

const handleSuccess = (res, dispatch, title) => {
    const successfulOptions = {
        title: `${title}`,
        message: ``,
        position: 'tr',
        autoDismiss: 5
    };
    if (res.data) {
        if (res.status === 200) {
            successfulOptions.title = title ? title : 'OK'
            successfulOptions.message = res.data.message
            dispatch(success(successfulOptions))
        } else if (res.status === 201) {
            successfulOptions.title = title ? title : 'Created'
            successfulOptions.message = res.data.message
            dispatch(success(successfulOptions))
        }
    } else if (res.data.message) {
        successfulOptions.message = res.data.message;
        dispatch(success(successfulOptions))
    } else {
        successfulOptions.message =
            'Your request could not be processed';
    }
};

export default handleSuccess;
