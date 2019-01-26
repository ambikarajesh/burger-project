import React from 'react';
import axios from '../../axios-orders';
import EachOrder from '../../Components/Order/EachOrder/EachOrder';
import Spinner from '../../Components/UI/Spinner/Spinner';
import classes from './Orders.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/Actions/indexActionCreator';

class Orders extends React.Component{    
    componentDidMount(){
        this.props.FetchOrdersHandler(this.props.token, this.props.userId);
    }
    render(){
        let orders = this.props.loading ? <Spinner/>: this.props.error ? <p>ERROR: FETCHING ORDERS FAILED</p> : null;
        
        if(this.props.orders.length > 0){
             orders = this.props.orders.map((order,i) =>{               
                return <EachOrder key = {i} Ingredients = {order.Ingredients} price = {order.price}/>
             })
        }
        
        
       
        return(
            <div className = {classes.Orders}>
               {orders}
            </div>
        )
    }
}

const mapStatetoProps = state =>{
    return{
        orders:state.orderReducer.orders,
        loading:state.orderReducer.loading,
        error: state.orderReducer.error,
        token:state.signUporInReducer.token,
        userId:state.signUporInReducer.userId
    }
}

const mapDispatchTOProps = dispatch =>{
    return{
        FetchOrdersHandler: (token, userId) => dispatch(actionCreator.FetchOrders(token, userId)) 
    }
} 
export default connect(mapStatetoProps,mapDispatchTOProps)(withErrorHandler(Orders, axios));
