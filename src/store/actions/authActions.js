import { auth } from 'Auth/Auth'
import * as actionType from './actionType'


const handleLoginError = (type, error, handle) => {
    if(type === 'login') {
        return {
            type: actionType.LOGIN_ERROR,
            error
        }
    } else if (type === 'signup') {
        return {
            type: actionType.SIGNUP_ERROR,
            error,
            handle
        }
    }
}

const setSession = (authResult) => {

  localStorage.setItem('isLoggedIn', 'true');
  let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
  return {
      type: actionType.LOGIN,
      id: authResult.idToken,
      access: authResult.accessToken,
      expires: expiresAt
  }
}

const signup = (name) => {
    return {
        type: actionType.SIGN_UP,
        name,
        status: true
    }
}

export const login = (email, password) => {
   return dispatch => {
    auth.login({
        email,
        password,
        realm: 'Username-Password-Authentication'
    }, (err) => {
        dispatch(handleLoginError('login', err.error_description))
    });
   } 
}

export const resetLoginError = () => {
    return {
        type: actionType.RESET_LOGIN_ERROR
    }
}

export const resetSignUpError = () => {
    return {
        type: actionType.RESET_SIGNUP_ERROR
    }
}

export const handleAuthentication = () => {
    return async dispatch => {
        try {
            auth.parseHash((err, authResult) => {
                if(err) return console.log(err)
                dispatch(setSession(authResult));
            });
        } catch (e) {
            console.log(e)
        }
    }
}

export const renewSession = () => {
  return async dispatch => {
    auth.checkSession({}, (err, authResult) => {
         if (authResult && authResult.accessToken && authResult.idToken) {
           dispatch(setSession(authResult));
         } else if (err) {
           dispatch(logout)
           console.log(err.error_description);
         }
      });
  }
}

export const logout = () => {
  localStorage.removeItem('isLoggedIn');

  const delay = (time = 1500) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  return async dispatch => {
    window.location.pathname = '/logout'
    await delay(1000)
    dispatch({
        type: actionType.LOGOUT
    })
  }
  
}



export const handleSignUp = (email, password, name) => {
    return dispatch => {
        auth.signup({
          email, 
          password,
          connection: 'Username-Password-Authentication',
          userMetadata: {
            name
          }
        }, (err, result) => {
          if(err) {
              if(err.policy) {
                dispatch(handleLoginError('signup', err.policy, 'pass'))
              } else {
                dispatch(handleLoginError('signup', err.code, 'email'))
              }
          } else if (result) {
            dispatch(signup(name))
          }
        })
    }
}