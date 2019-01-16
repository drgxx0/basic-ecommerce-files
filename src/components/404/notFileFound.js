import React from 'react'

import './notFileFound.css'

const NotFileFound = () => {
    return (
        <React.Fragment>
            <div className='content'>
                <i class="fas fa-exclamation-triangle fa-10x"></i>
                <h3>Sorry, page not found</h3>
            </div>
        </React.Fragment>
        
    )
}

export default NotFileFound