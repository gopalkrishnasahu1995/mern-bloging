import { bindActionCreators } from 'redux'
import * as auth from '../pages/auth/auth.actions'

export default function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...auth,
        },
        dispatch
    );
}
