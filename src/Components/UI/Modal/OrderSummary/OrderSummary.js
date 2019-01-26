import React from 'react';
import Button from '../../../Button/Button';
class OrderSummary extends React.Component {
    render(){
        const IngredientsList  = Object.keys(this.props.Ingredients).map(Ingredient => {
            return <li key = {Ingredient}>{Ingredient} : {this.props.Ingredients[Ingredient]}</li>
        })
        return(
            <React.Fragment>
                <h3>Your Order is,</h3>
                <p>A delicious burger with the following Ingredients:</p>
                <ul>{IngredientsList}</ul>
                <p><strong>Total Price: ${this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType = "Cancel" clicked = {this.props.OrderCancel}>CANCEL</Button>
                <Button btnType = 'Continue' clicked = {this.props.OrderContinue}>{this.props.isAuthenticated ? 'CONTINUE' : 'SIGN IN'}</Button>
            </React.Fragment>
        );
    }
}

export default OrderSummary;