import * as actionType from 'store/actions/actionType'


const initState = {
    login: {
        idToken: '',
        accessToken: '',
        expiresAt: 0,
        loginError: '',
    },
    signup: {
        status: false,
        name: '',
        error: '',
        asterik: ''
    }
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionType.LOGIN:
            return {
                ...state,
                login: {
                    ...state['login'],
                    idToken: action.id,
                    accessToken: action.access,
                    expires: action.expires
                }
            }
        case actionType.LOGIN_ERROR:
            return {
                ...state,
                login: {
                    ...state['login'],
                    loginError: action.error
                }
            }
        case actionType.RESET_LOGIN_ERROR:
            return {
                ...state,
                login: {
                    ...state['login'],
                    loginError: ''
                }
            }
        case actionType.SIGN_UP:    
            return {
                ...state,
                signup: {
                    ...state['signup'],
                    status: action.status,
                    name: action.name
                }
            }
        case actionType.SIGNUP_ERROR:
            return {
                ...state,
                signup: {
                    ...state['signup'],
                    error: action.error,
                    asterik: action.handle
                }
            }
        case actionType.RESET_SIGNUP_ERROR:
            return {
                ...state,
                signup: {
                    ...state['signup'],
                    error: '',
                    asterik: ''
                }
            }
        case actionType.LOGOUT:
            return {
                ...state,
                login: {
                    ...state['login'],
                    idToken: '',
                    accessToken: '',
                    expiresAt: 0
                }
            }
        default:
            return state
    }
}

export default reducer