import React from 'react';
import OrderCheckoutSummary from '../../Components/Order/OrderCheckoutSummary/OrderCheckoutSummary';
import classes from './Checkout.module.css';
import ContactData from '../ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
class Checkout extends React.Component{
        
    OrderCheckoutCancel = () => {
            this.props.history.goBack();
    }
    OrderCheckoutContinue = () => {
                this.props.history.replace('/checkout/contact-data');
    }
    render(){
        
        let Order = <Redirect to ='/'/>
        let PurchasedRedirect = this.props.purchase ? <Redirect to ='/'/> : null;
        if(this.props.Ingredients){                               
                    Order = (<React.Fragment> 
                                {PurchasedRedirect}
                                <OrderCheckoutSummary Ingredients = {this.props.Ingredients} OrderCancel = {this.OrderCheckoutCancel} OrderContinue = {this.OrderCheckoutContinue}/>
                                <Route path = {this.props.match.url+'/contact-data'} component = {ContactData}/>
                            </React.Fragment>)          
            
        }
        return(
            <div className = {classes.Checkout}>
                {Order}                
            </div>
        )
    }
}

const mapStatetoProps = state =>{
    return{
        Ingredients:state.burgerBuilderReducer.Ingredients,
        purchase: state.orderReducer.purchase
    }
}

export default connect(mapStatetoProps)(Checkout);