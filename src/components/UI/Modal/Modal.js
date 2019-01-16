import React from 'react'
import Backdrop from '../Backdrop/Backdrop'

import './Modal.css'

const Modal = ({ children, onModalManage, resetLoginError, resetSignUpError, loginError, signupError }) => {
    return (<React.Fragment>
        <div className='modal'>
            <div className='modalBox'>{children}</div>
        </div>
        <Backdrop onModalManage={onModalManage} resetSignUpError={resetSignUpError} resetLoginError={resetLoginError} signupError={signupError} loginError={loginError} modal={children.type.name} />
    </React.Fragment>)
}

export default Modal