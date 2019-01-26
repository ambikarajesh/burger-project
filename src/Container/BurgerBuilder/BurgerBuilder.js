import React from 'react';
import Burger from '../../Components/Burger/Burger';
import BurgerControls from '../../Components/Burger/BurgerControls/BurgerControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/UI/Modal/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/Actions/indexActionCreator';



class BurgerBuilder extends React.Component{
    state = {
        order:false,
    }

    // get Ingredients initial properties from firebase
    componentDidMount() {
        this.props.FetchInitialIngredientsHandler();
    }

    //if any one Ingredient greaterthan  0, set Order button undisable, otherwise set disable.
    OrderButtonState(Ingredients){
        const Sum = Object.keys(Ingredients).map(Ingredient => {
            return Ingredients[Ingredient];
        }).reduce((total,current)=>{
            return total+current;
        })
       return Sum>0
    }

    

    // backdrop and ordersummay display if order is true, order is true when click order button.
    OrderBurger = () => {
        this.setState({order:true});
    }

    // remove backdrop and ordersummary dispaly if order is false , order is false when click cancel button or backdrop in ordersummary
    CancelOrderBurger = () => {
        this.setState({order:false});
    }

    // when click continue button in ordersummary, go to checkout with INgredients
    ContinueOrderBurger = () => {
        this.props.PurchaseInitHandler();
        if(this.props.isAuthenticated){
            this.props.history.push('/checkout');
        }
        else{
            this.props.SetAuthPathHandler('/checkout')
            this.props.history.push('/signin');
        }
    }


    render(){
        // Array of ingreditents value are true or false. if value (=0) true, less button is disabled or false (1,2,3..), undisable less button
        let disableIngredients = {...this.props.Ingredients};
        for(let Ingredient in disableIngredients){
            disableIngredients[Ingredient] = disableIngredients[Ingredient] <= 0;
        }
        // Display loading symbol, if can't get Ingredients initial properties from firebase
        let burger = this.props.error ? <p>Ingredients can't be loaded</p>:<Spinner/>;

        // Initially Order summary is null because Ingredients properties not set from firebase 
        let orderSummary = null;

        if(this.props.Ingredients){
            //Display Burger Image and control button if can get Ingredients initial properties from firebase
            burger = (
            <React.Fragment>
                <Burger Ingredients = {this.props.Ingredients}/>
                <BurgerControls Ingredients = {this.props.Ingredients}
                            Add = {this.props.AddIngredientHandler}
                            Remove = {this.props.RemoveIngredientHandler}
                            Price = {this.props.TotalPrice}
                            disableIngredients = {disableIngredients}
                            disable = {this.OrderButtonState(this.props.Ingredients)}                            
                            clicked = {this.OrderBurger}/>
            </React.Fragment>)
            
             orderSummary = <OrderSummary Ingredients = {this.props.Ingredients}
                                          price = {this.props.TotalPrice}
                                          OrderCancel = {this.CancelOrderBurger}
                                          isAuthenticated = {this.props.isAuthenticated}
                                          OrderContinue = {this.ContinueOrderBurger}/>;
        }

        // if order is set true, when click order button. display backdrop in Model component
        return(
            <React.Fragment>
                <Modal  show = {this.state.order} Click = {this.CancelOrderBurger}>
                        {orderSummary}
                </Modal>
                {burger}

            </React.Fragment>
        )
    }
}

const mapStatetoProps = state =>{
    return{
        Ingredients:state.burgerBuilderReducer.Ingredients,
        TotalPrice:state.burgerBuilderReducer.TotalPrice,
        error:state.burgerBuilderReducer.error,
        isAuthenticated:state.signUporInReducer.token
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        AddIngredientHandler: (IngredientName) => dispatch(actionCreators.AddIngredient(IngredientName)),
        RemoveIngredientHandler: (IngredientName) => dispatch(actionCreators.RemoveIngredient(IngredientName)),
        FetchInitialIngredientsHandler: () => dispatch(actionCreators.FetchInitialIngredients()),
        PurchaseInitHandler: () => dispatch(actionCreators.PurchaseInit()),
        SetAuthPathHandler : (path) => dispatch(actionCreators.SetAuthPath(path))
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
