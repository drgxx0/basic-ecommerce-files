import React from "react";
import ItemList from "../CategoryList/ItemList/itemList";

import "./Cart.css";

const Cart = ({ articlesSelected, totalPrice, access, deleteItem }) => {
  const selected = Object.keys(articlesSelected).map(article => {
    return (
      <ItemList
        img={articlesSelected[article].img}
        price={articlesSelected[article].price}
        title={articlesSelected[article].title}
        id={articlesSelected[article].id}
        count={articlesSelected[article].count}
        key={Math.floor(Math.random() * 1000) + 1}
        isCart
        deleteItem={deleteItem}
        articlesSelected={articlesSelected}
      />
    );
  });
  return (
    <div className="cart">
      <div className="items">
        {selected.length ? selected : <p>No items selected</p>}
      </div>
      <div className="totalPrice">
        <strong>Total price:</strong> {Math.abs(Number(totalPrice)).toFixed(2)}$
      </div>
      <div className="buttonContent">
        <div
          className={`button ${
            selected.length && access ? "" : "disabled"
          }`}
        >
          Continue
        </div>
      </div>
    </div>
  );
};

export default Cart;
