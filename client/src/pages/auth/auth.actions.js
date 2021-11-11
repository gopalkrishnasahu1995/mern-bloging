import * as registerType from './auth.constants'
import axios from '../../config/axios'

export const Register = (name, account, password) => async (dispatch) => {
    try {
      dispatch({ type: registerType.REGISTER_START });
      const registerdata = {
        name,
        account,
        password,
      };

      console.log(registerdata)

      await axios
        .post("/auth/register", registerdata)
        .then((res) => {
          const data = res.data
          dispatch({
            type: registerType.REGISTER_SUCCESS,
            payload: data,
          });
        });
    } catch (error) {
      dispatch({
        type: registerType.REGISTER_FAILED,
        payload:error.response && error.response.data.error
            ? error.response
            : error.message,
      });
    }
  };
  