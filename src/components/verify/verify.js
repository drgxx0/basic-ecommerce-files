import React from 'react';

import './verify.css'

const Verify = ({ name }) => {
    return (
        <div className='verifyContainer'>
            <div className='box'>
                <h2>Verify your email address</h2>
                <i className="fas fa-check fa-7x"></i>
                <h4>Welcome {name}</h4>
                <p>Please check your email inbox and verify your data</p>
                <p>Go to <a href='/'>home</a></p>
            </div>
        </div>
    )
}

export default Verify