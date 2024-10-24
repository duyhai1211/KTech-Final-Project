import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: ''
    },
    isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    const { access_token, refresh_token, username, image, role, email } = action?.payload?.DT || {};
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log(`check action: `, action)
            return {
                ...state,
                account: {
                    access_token,
                    refresh_token,
                    username,
                    image,
                    role,
                    email
                },
                isAuthenticated: true
            };

        // case DECREMENT:
        //     return {
        //         ...state, count: state.count - 1,
        //     };
        default: return state;
    }
};

export default userReducer;