import React from 'react';
import Input from '../../Components/Input/Input';
import * as actionCreators from '../../store/Actions/indexActionCreator';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject, checkvalidity, formValidity} from '../../shared/Utility';
import Button from '../../Components/Button/Button';
import classes from './SignUporIn.module.css';
class SignUporIn extends React.Component{
    state ={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email...'
                },
                value:'',
                valid:false,
            },
            
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password...',
                },
                value:'',
                valid:false,
            }
        },
        formVaild:false,
        isSignUp:true
    }
    componentDidMount(){
        if(!this.props.building && this.props.setAuthPath !== '/checkout'){
            this.props.SetAuthPathHandler('/');
        }
    }
    
    
    InputChangeHandler = (event, id) => {
        const updateControl = updateObject(this.state.controls[id], {
            value : event.target.value,
            valid : checkvalidity(id,event.target.value)
        })
        const updateControls = updateObject(this.state.controls,{[id]:updateControl});
        this.setState({formVaild:formValidity(this.state.controls)});   
        this.setState({controls:updateControls})
    }

    SignUpHandler = (event) => {
        event.preventDefault();
        const signUpData = {};
        
        
        for(let key in this.state.controls){
              signUpData[key] = this.state.controls[key].value;
        }
        this.props.SignUporInHandler(signUpData.email, signUpData.password, this.state.isSignUp);
    }


SwitchHandler = () =>{
    this.setState(prevState =>{
        return {isSignUp:!prevState.isSignUp}
    })
}
    render(){
        let elementList = [];
        for(let key in this.state.controls){
            elementList.push({...this.state.controls[key], id :key})
        }
        let InputList = elementList.map(element =>{
            return <Input key = {element.id} elementType = {element.elementType} elementConfig = {element.elementConfig} value = {element.value} valid = {element.valid} changed = {(event) => this.InputChangeHandler(event, element.id)}/>
        })
            
        if(this.props.loading){
            InputList = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p style = {{color:'red'}}>{this.props.error.message}</p>
        }
        
        return(
            <div className = {classes.SignUporIn}>
                {this.props.isAuthenticated ? <Redirect to = {this.props.setAuthPath}/>:null}
                {errorMessage}
                <form className = {classes.Form} onSubmit = {this.SignUpHandler}>
                    <p style = {{color:'#3B4A58', fontWeight:'bold'}}>{this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}</p>
                    {InputList}
                    <Button btnType = {this.state.formVaild ? 'AuthIn' : null} disabled = {!this.state.formVaild}>SUBMIT</Button>
                </form>
                <Button btnType = 'AuthOut' clicked = {this.SwitchHandler} disabled= {false}>{!this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}</Button>
            </div>
        )
    }
}
const mapStatetoProps = state =>{
    return{
        loading:state.signUporInReducer.loading,
        error:state.signUporInReducer.error,
        token:state.signUporInReducer.token,
        userId:state.signUporInReducer.userId,
        isAuthenticated:state.signUporInReducer.token !== null,
        building:state.burgerBuilderReducer.building,
        setAuthPath:state.signUporInReducer.setAuthPath
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        SignUporInHandler : (email, password, isSignUp) =>dispatch(actionCreators.SignUporIn(email, password, isSignUp)),
        SetAuthPathHandler : (path) => dispatch(actionCreators.SetAuthPath(path))
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(SignUporIn);
