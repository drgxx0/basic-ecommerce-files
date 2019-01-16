import React from 'react'
import { Link } from 'react-router-dom'


import './itemList.css'

const ItemList = ({ price, img, title, addItemCart, isCart, deleteItem, id, articlesSelected, count, desc }) => {
  
    const slugify = (text) =>
    {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    }

    return (
    <React.Fragment>
        <div className='itemList'>
            {isCart ? <div className='deleteItem' onClick={() => deleteItem(articlesSelected, price, id)}>X</div> : null}
            <div className='imgItem'><img src={img} alt={title} /></div>
            <div className='pricebutton'>
                <div className='priceItem'>
                    <p><strong>Price:</strong> {price}$</p>
                    {isCart ? null : <div className='buyButton' onClick={() => addItemCart(articlesSelected, title, img, price, id)}>Buy</div>}
                </div>
            </div>
            <div className='titleItem' style={{textTransform: 'capitalize'}}><strong><Link to={{
                pathname: `/item/${id}/${slugify(title)}`,
                state: {
                    title,
                    price,
                    img,
                    desc,
                    id,
                }
            }}>{count > 1 ? `${count} x ${title}` : title}</Link></strong></div>  
        </div>
    </React.Fragment>
    )
}

export default ItemList