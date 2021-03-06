import * as registerType from './auth.constants'

const initialState = {
    error: "",
    loading: false,
    userInfo: "",
    success: false,
    data: {},
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case registerType.REGISTER_START:
            return {
                loading: true,
            };
        case registerType.REGISTER_SUCCESS:
            return {
                data: action.payload,
                success: true,
                loading:false
            };
        case registerType.REGISTER_FAILED:
            return {
                error: action.payload,
            };
        case registerType.REGISTER_RESET:
            return {};
        default:
            return state;
    }
};

export default registerReducer