import React from 'react'
import { withRouter } from 'react-router';

import './callback.css'

const Callback = (props) => { 
    const delay = (time = 1500) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, time);
      });
    };
    
    props.onHandleAuthentication().then(async () => {
      await delay()  
      props.history.push('/');
    });

    return (
        <div className='container'>
            <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
            </div>
        </div>
    )
}

export default withRouter(Callback)