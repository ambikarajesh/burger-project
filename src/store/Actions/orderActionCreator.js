import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const PurchaseInit = () =>{
    return {
        type: actionTypes.PURCHASE_INIT,
    }   
}

export const PurchaseStart = () =>{
    return {
        type: actionTypes.PURCHASE_START,
    }   
}
export const PurchaseSuccess = () =>{
    return {
        type: actionTypes.PURCHASE_SUCCESS,
    }   
}

export const PurchaseFail = (error) =>{
    return {
        type: actionTypes.PURCHASE_FAIL,
        error:error
    }   
}

export const Purchase = (orderdata, token) =>{
    return dispatch =>{
        dispatch(PurchaseStart());
        axios.post('/orders.json?auth='+token, orderdata).then(response => {
            dispatch(PurchaseSuccess());
        }).catch(error =>{
            dispatch(PurchaseFail(error));
        })
    }   
}

export const FetchOrderStart = () =>{
    return {
        type: actionTypes.FETCH_ORDER_START,
    }   
} 

export const FetchOrderSuccess = (orders) =>{
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }   
}

export const FetchOrderFail = (error) =>{
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error:error
    }   
}
export const FetchOrders = (token, userId) =>{
    
    return dispatch => {   
        dispatch(FetchOrderStart());
        axios.get('/orders.json', {
            params: {
                auth: token,
                orderBy: '"userId"',
                equalTo: `"${userId}"`,
            }
          }).then(res => {
            const orders = [];
            for (let key in res.data){
                orders.push({...res.data[key], id:new Date()});
            }
            dispatch(FetchOrderSuccess(orders));
        }).catch(error => {
            dispatch(FetchOrderFail(error));
        })
    }
}