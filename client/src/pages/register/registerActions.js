import * as registerType from './constants'
import axios from '../../config/axios'

export const Register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: registerType.REGISTER_START });
      const registerdata = {
        name,
        email,
        password,
      };
      await axios
        .post("/user/createUser", registerdata)
        .then((res) => {
          const data = res.data.data;
          dispatch({
            type: registerType.REGISTER_SUCCESS,
            payload: data,
          });
        });
    } catch (error) {
      dispatch({
        type: registerType.REGISTER_FAILED,
        payload:error.response.data.message
        //   error.response && error.response.data.error
        //     ? error.response
        //     : error.message,
      });
    }
  };
  