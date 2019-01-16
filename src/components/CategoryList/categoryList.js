import React, { Component } from 'react'



import ItemList from './ItemList/itemList'

import './categoryList.css'

class CategoryList extends Component {

    state = {
        menu: ['food', 'tech', 'clothes', 'books', 'home', 'vg'],
        active: 'food'
    }

    changeCategory = (cat) => {
        this.props.onLoadFetchArticles(cat)
        this.setState({
            active: cat
        })
    }

    render() {
        const { fetchArticles, articlesSelected } = this.props

        const { menu, active } = this.state
        const final = fetchArticles.map(item => {
            return <ItemList addItemCart={this.props.addItemCart} key={item.title} id={item.id} img={item.img} price={item.price} title={item.title} articlesSelected={articlesSelected} desc={item.description} />
            })

        const itemCat = menu.map(item => {
            return <li key={item} className={active === item ? 'active': ''} onClick={() => this.changeCategory(item)} style={{textTransform: 'capitalize'}}>{item}</li>
        })

        return (
        <div className='categoryList'>
                <div className='categories'>
                { window.innerWidth > 767 ?  <ul>
                        {itemCat}
                    </ul> : 
                    <select onChange={(e) => this.changeCategory(e.target.value)}>
                        <option value="food">Food</option>
                        <option value="tech">Technology</option>
                        <option value="clothes">Clothes</option>
                        <option value="books">Books</option>
                        <option value="home">Home</option>
                        <option value="vg">Video Games</option>
                    </select> }
                </div>
                <div className='itemsList'>
                    {fetchArticles.length ? final : 
                    <div className="sk-circle">
                      <div className="sk-circle1 sk-child"></div>
                      <div className="sk-circle2 sk-child"></div>
                      <div className="sk-circle3 sk-child"></div>
                      <div className="sk-circle4 sk-child"></div>
                      <div className="sk-circle5 sk-child"></div>
                      <div className="sk-circle6 sk-child"></div>
                      <div className="sk-circle7 sk-child"></div>
                      <div className="sk-circle8 sk-child"></div>
                      <div className="sk-circle9 sk-child"></div>
                      <div className="sk-circle10 sk-child"></div>
                      <div className="sk-circle11 sk-child"></div>
                      <div className="sk-circle12 sk-child"></div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default CategoryList