import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from 'react-router-dom'

import NavBar from "components/Navbar/navBar";
import NavBarSec from "components/Navbar/Sec/navBarSec";
import ProductSlide from "components/ProductSlide/productSlide";
import CategoryList from "components/CategoryList/categoryList";
import Modal from "components/UI/Modal/Modal";
import Cart from "components/Cart/Cart";
import Login from "components/Login/Login";
import Footer from "components/Footer/Footer";
import SignUp from 'components/Signup/Signup'
import Verify from 'components/verify/verify'
import Item from 'components/Item/Item'
import NotFileFound from "../components/404/notFileFound";

import Callback from 'components/callback/callback'
import Logout from 'components/callback/logout'

import * as UIAction from "store/actions/UIActions";
import * as authAction from "store/actions/authActions"
import * as itemAction from 'store/actions/itemsActions'

import "./App.css";


class App extends Component {

  state = {
    loading: true
  }

  delay = (time = 1500) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  addItem = (articles, title, img, price, id) => {
    this.props.onShoppingCart("add");
    this.props.addArticleToCart(articles, title, img, price, id);
  };

  removeItem = (articles, price, id) => {
    this.props.onShoppingCart("subs");
    this.props.removeArticleToCart(articles, price, id);
  };

  componentDidMount = () => {
    window.addEventListener('load', async() => {
      await this.delay(1000)
      if(this.state.loading) {
        this.setState({
          loading: false
        })
      }
    })

    this.props.onLoadFetchArticles("food");
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.props.renewSession();
    }
    
    this.props.getAllImg()
  };

  render() {

    const {
      onModalManage,
      modal,
      modalCart,
      modalLogin,
      modalSignUp,
      shoppingCart,
      fetchArticles,
      onLoadFetchArticles,
      articlesSelected,
      totalPrice,
      loginError,
      onLogin,
      access,
      onHandleAuthentication,
      resetLoginError,
      onLogout,
      name,
      signupError,
      handleSignUp,
      signup,
      asterik,
      resetSignUpError,
      renderImg
    } = this.props;

    const { loading } = this.state

    const home = (
      <React.Fragment>
      {loading ? <div className='container'>
          <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
          </div>
      </div> : !signup ? <div className="app">
       <React.Fragment>
       <NavBar onModalManage={onModalManage} access={access} onLogout={onLogout} />  
       <NavBarSec
           shoppingCart={shoppingCart}
           onModalManage={onModalManage}
         />
          <ProductSlide renderImg={renderImg} />
          <CategoryList
            onLoadFetchArticles={onLoadFetchArticles}
            fetchArticles={fetchArticles}
            addItemCart={this.addItem}
            articlesSelected={articlesSelected}
          />
        </React.Fragment> 
      </div> : <Verify name={name} /> }
      </React.Fragment>
    )

    return (
      <React.Fragment>
        {modal ? (
          <Modal onModalManage={onModalManage} resetSignUpError={resetSignUpError} resetLoginError={resetLoginError} signupError={signupError} loginError={loginError}>
            {modalCart ? (
              <Cart
                deleteItem={this.removeItem}
                access={access}
                articlesSelected={articlesSelected}
                totalPrice={totalPrice}
              />
            ) : modalLogin ? (
              <Login onLogin={onLogin} loginError={loginError} />
            ) : modalSignUp ? <SignUp name={name} handleSignUp={handleSignUp} signupError={signupError} loading={signup} asterik={asterik} /> : null}
          </Modal>
        ) : null}
        <Switch>
          <Route exact path='/' render={() => home} />
          <Route exact path='/signin' render={(props) => <Callback onHandleAuthentication={onHandleAuthentication} {...props} />
          } />
          <Route exact path='/logout' render={(props) => <Logout {...props} />} />
          <Route path='/item/:id' render={(props) => <Item {...props} addItemCart={this.addItem} articlesSelected={articlesSelected} onModalManage={onModalManage} access={access} onLogout={onLogout} shoppingCart={shoppingCart} />} />
          <Route component={NotFileFound} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    shoppingCart: state.ui.shoppingCart,
    modal: state.ui.modal,
    modalCart: state.ui.modalCart,
    modalLogin: state.ui.modalLogin,
    modalSignUp: state.ui.modalSignUp,
    fetchArticles: state.item.fetchArticles,
    articlesSelected: state.item.articlesSelected,
    totalPrice: state.item.totalPrice,
    loginError: state.auth.login.loginError,
    access: state.auth.login.accessToken,
    name: state.auth.signup.name,
    signupError: state.auth.signup.error,
    signup: state.auth.signup.status,
    asterik: state.auth.signup.asterik,
    renderImg: state.item.renderImg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onModalManage: (modal, status) =>
      dispatch(UIAction.modalManager(modal, status)),
    onShoppingCart: operation =>
      dispatch(UIAction.shoppingCartManager(operation)),
    onLoadFetchArticles: cat => dispatch(itemAction.fetchingArticles(cat)),
    addArticleToCart: (articles, title, img, price, id) =>
      dispatch(itemAction.addArticleToCart(articles, title, img, price, id)),
    removeArticleToCart: (articles, price, id) =>
      dispatch(itemAction.deleteArticlesSelected(articles, price, id)),
    onLogin: (username, password) => dispatch(authAction.login(username, password)),
    onHandleAuthentication: () => dispatch(authAction.handleAuthentication()),
    resetLoginError: () => dispatch(authAction.resetLoginError()),
    onLogout: () => dispatch(authAction.logout()),
    renewSession: () => dispatch(authAction.renewSession()),
    handleSignUp: (email, password, name) => dispatch(authAction.handleSignUp(email, password, name)),
    resetSignUpError: () => dispatch(authAction.resetSignUpError()),
    getAllImg: () => dispatch(itemAction.getAllImg())
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
