import React from 'react';
//import Button from '../../Components/UI/Modal/OrderSummary/Button/Button';
import classes from './ContactData.module.css';
import {withRouter} from 'react-router-dom';
import Input from '../../Components/Input/Input';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/Actions/indexActionCreator';
import {updateObject, checkvalidity, formValidity} from '../../shared/Utility';
import Button from '../../Components/Button/Button';

class ContactData extends React.Component{
    state ={
        orderForm :{
            name:{
                elementType:'input', 
                elementConfig:{
                    type:'text',
                    placeholder:'Name...'
                },                              
                value:'',
                valid:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'E-mail...'
                },
                value:'',
                valid:false                
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street...'
                },
                value:'',
                valid:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code...'
                },
                value:'',
                valid:false
            },
            delivaryType:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', disValue:'Fastest'}, 
                        {value:'cheapest', disValue:'Cheapest'},
                    ],
                },
                value:'fastest',
                valid:true
            }
        },
        formVaild:false
    }
    
    OrderConform = (event) => {
        event.preventDefault();        
        const  cusContact ={};
        for(let key in this.state.orderForm){
            cusContact[key] = this.state.orderForm[key].value;
        }
       const order = {           
            Ingredients:this.props.Ingredients,
            price:this.props.TotalPrice,  
            contact: cusContact,
            userId: this.props.userId                     
        }
        this.props.PurchaseHandler(order, this.props.token);
    }

    
    InputChangeHolder =(event, elementId) =>{
        const updateOrder = updateObject(this.state.orderForm[elementId], {
            value : event.target.value,
            valid : checkvalidity(elementId,event.target.value)        })
        const updateOrderForm = updateObject(this.state.orderForm,{[elementId]:updateOrder});        
        this.setState({orderForm:updateOrderForm})
    }

    
    render(){
       let elementList = [];
       for(let key in this.state.orderForm){
           elementList.push({...this.state.orderForm[key], id:key})
       }
      const inputArray = elementList.map(element =>{
           return  <Input key ={element.id} label ={element.id} elementConfig = {element.elementConfig} value = {element.value} elementType = {element.elementType} valid = {element.valid} changed ={(event) => this.InputChangeHolder(event,element.id)}/>
      })
   
        return(
            <div className = {classes.ContactData}>
                <h1>Enter Your Contact Information:</h1>
                <form onSubmit = {this.OrderConform}>
                    {inputArray}
                    <Button btnType = {formValidity(this.state.orderForm) ? 'AuthIn' : null} disabled = {!formValidity(this.state.orderForm)}>ORDER</Button>
                    
                </form>
            </div>
        );
    }
}

const mapStatetoProps = state =>{
    return{
        Ingredients:state.burgerBuilderReducer.Ingredients,
        TotalPrice:state.burgerBuilderReducer.TotalPrice,
        loading:state.orderReducer.loading,
        token:state.signUporInReducer.token,
        userId:state.signUporInReducer.userId
    }
}

const mapDispatchTOProps = dispatch =>{
    return{
        PurchaseHandler: (orderData, token) => dispatch(actionCreator.Purchase(orderData, token)) 
    }
}
export default connect(mapStatetoProps, mapDispatchTOProps)(withRouter(ContactData));