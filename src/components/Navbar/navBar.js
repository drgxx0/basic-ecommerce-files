import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as itemActions from 'store/actions/itemsActions'

import logo from 'components/assets/img/logo.png'

import './navbar.css'

class NavBar extends Component {

    myRef = React.createRef();

    slugify = (text) =>
    {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    }

    delay = (time = 1500) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, time);
      });
    };

    onBlur = async() => {
     await this.delay(100)   
     this.props.clearSearchSuggest()
    }

    onFocus = () => {
        this.myRef.current.value = ''
        this.props.clearSearchSuggest()
    }

    render() {
        const { onModalManage, searchSug, onSearch, access, onLogout } = this.props;
        const allSearch = searchSug.map(sug => <li key={sug.id}><Link to={{
            pathname: `/item/${sug.id}/${this.slugify(sug.title)}`,
            state: {
                title: sug.title,
                price: sug.price,
                img: sug.img,
                desc: sug.description,
                id: sug.id,
            }
        }}>{sug.title}</Link></li>)
        return (
       <nav className='nav'>
            <div className='left'><img src={logo} alt='logo' /></div>
            <div className='search'>
                <input ref={this.myRef} className='input' type='text' placeholder='Search' onChange={(e) => onSearch(e.target.value)} onBlur={this.onBlur} onFocus={this.onFocus} />
                <div className='searchbutton'>
                    <i className="fas fa-search" style={{color: 'black'}}></i>
                </div>
                <div className='searchSuggest'>{allSearch.length ? allSearch : null}</div>
            </div>
            {!access ? <div className='right'>
                <div className='rightbutton' onClick={() => onModalManage('modalLogin', true)}>Login</div>
                <div className='rightbutton' onClick={() => onModalManage('modalSignUp', true)}>Sign up</div>
            </div> : <div className='right'>
                <div className='rightbutton' onClick={onLogout}>Logout</div>
            </div>}
        </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchSug: state.item.searchSug
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (data) => dispatch(itemActions.searchSuggest(data)),
        clearSearchSuggest: () => dispatch(itemActions.clearSearchSuggest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)