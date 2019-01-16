import React from 'react'
import { withRouter } from 'react-router';

import './callback.css'

const Logout = (props) => {
    const loginOut = () => {
       return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, 1200)
       }) 
    };

    loginOut().then(() => {props.history.push('/')})

    return (
        <div className='container'>
            <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
            </div>
        </div>
    )
}

export default withRouter(Logout)