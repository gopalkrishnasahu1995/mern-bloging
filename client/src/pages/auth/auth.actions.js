import * as registerType from './auth.constants'
import handleError from '../../utils/errorHandler'
import handleSuccess from '../../utils/successHandler'
import AuthRequests from '../../config/requests'

export const registerAction = (name,account,password)=>{
  return async (dispatch, getState) => {
    console.log(getState)
    try {
      dispatch({ type: registerType.REGISTER_START });
      const registerdata = {
        name,
        account,
        password,
      };
      await AuthRequests.auth().signup(registerdata)
        .then(res => {
          console.log(res, 'register user response')
          const data = res.data
          dispatch({
            type: registerType.REGISTER_SUCCESS,
            payload: data.message
          })
          handleSuccess(res, dispatch, 'Registration success')
        })
    } catch (error) {
      console.log(error.response, 'error while fetch')
      dispatch({
        type: registerType.REGISTER_FAILED,
        payload: error.response && error.response.data.error
          ? error.response
          : error.message,
      });
      handleError(error, dispatch, 'Failed while register')
    }
  }
}

