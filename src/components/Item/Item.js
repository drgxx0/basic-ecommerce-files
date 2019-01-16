import React from 'react'

import NavBar from "components/Navbar/navBar";
import NavBarSec from "components/Navbar/Sec/navBarSec";

import './Item.css'

const Items = ({ history, addItemCart, articlesSelected, onModalManage, access, onLogout, shoppingCart }) => {
    
    const {title, price, desc, img, id } = history.location.state

    return (
        <React.Fragment>
            <NavBar onModalManage={onModalManage} access={access} onLogout={onLogout} />  
            <NavBarSec
                shoppingCart={shoppingCart}
                onModalManage={onModalManage}
                item
              />
            <main className="container">
            <div className="left-column">
                <img data-image="img" src={img} alt={title} />
            </div>

            <div className="right-column">

                <div className="product-description">
                <span></span>
                <h1>{title}</h1>
                <p style={{textAlign: 'justify'}}>{desc}</p>
                </div>

                <div className="product-price">
                <span>{price}$</span>
                <div className="cart-btn" onClick={() => addItemCart(articlesSelected, title, img, price, id)}>Buy</div>
                </div>
            </div>
            </main>
        </React.Fragment>
    )
}


export default Items