import React from 'react'
import './Backdrop.css'


const Backdrop = ({ onModalManage, modal, resetLoginError, resetSignUpError, loginError, signupError }) => {
    const combineFunction = () => {
        onModalManage(`modal${modal}`, false)
        if(modal === 'Login' && loginError) {
            resetLoginError()
        } else if (modal === 'Signup' && signupError)  {
            resetSignUpError()
        }
    }
    return <div className='backdrop' onClick={combineFunction}></div>
}

export default Backdrop