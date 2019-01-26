import  React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../Button/Button';
import classes from './OrderCheckoutSummary.module.css';
const OrderCheckoutSummary = (props) => {
    return(
        <div  className = {classes.CheckoutButton}>
            <h1>We hope it tastes well!!!</h1>
            <Burger Ingredients = {props.Ingredients}/>
            <div> 
                <Button btnType = "Cancel" clicked = {props.OrderCancel} disabled = {false}>CANCEL</Button>
                <Button btnType = 'Continue' clicked = {props.OrderContinue} disabled = {false}>CHECKOUT</Button>
            </div>
            
        </div>
    )
}

export default OrderCheckoutSummary;