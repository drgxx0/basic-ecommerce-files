import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import UIReducer from 'store/reducers/UIReducer';
import ItemsReducer from 'store/reducers/itemsReducer'
import authReducer from 'store/reducers/authReducer'
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom'

import createSagaMiddleware from 'redux-saga'

import renderItems from 'store/saga/renderItems'

import 'index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    ui: UIReducer,
    item: ItemsReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));


sagaMiddleware.run(renderItems)

const app = (
    <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

