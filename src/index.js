import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import BurgerBuilderReducer from './store/Reducers/burgerBuilderReducer';
import OrderReducer from './store/Reducers/orderReducer';
import SignUporInReducer from './store/Reducers/signUporInReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const RootReducer = combineReducers({
    burgerBuilderReducer: BurgerBuilderReducer,
    orderReducer: OrderReducer,
    signUporInReducer:SignUporInReducer
})
const logger = store =>{
    return next =>{
        return action =>{
            //console.log('MIDDLEWARE dispatch:', action);
            const result = next(action);
            //console.log('Next :', store.getState())
            return result;
        }
    }
}

const composeEnhancers = process.env.NODE_ENV ==='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(logger, thunk)));
const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
