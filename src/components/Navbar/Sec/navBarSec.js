import React from 'react'
import './navBarSec.css'


const NavBarSec = ({ shoppingCart, onModalManage, item }) => {
    return (
    <nav className='navsec'>
        {item ? <i style={{cursor: 'pointer', width: '50px'}} className="far fa-arrow-alt-circle-left fa-3x" onClick={ () => window.location.pathname = '/'}></i> : ''}
        <div className='cartbutton' onClick={() => onModalManage('modalCart', true)}>
        <i className="fas fa-shopping-cart"></i><p>{shoppingCart}</p></div>
    </nav>)
}

export default NavBarSec