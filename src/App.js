import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import {Route, Switch} from 'react-router-dom';
import Logout from './Container/Logout/Logout';
import {connect} from 'react-redux';
import * as actionCreators from './store/Actions/signUporInActionCreator';
import {withRouter, Redirect} from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(()=>{
    return import('./Container/Checkout/Checkout');
})

const asyncOrder = asyncComponent(()=>{
    return import('./Container/Orders/Orders');
})

const asyncSignIn = asyncComponent(()=>{
    return import('./Container/SignUporIn/SignUporIn');
})
class App extends React.Component { 
    componentDidMount(){
        this.props.RefreshHandler();
    }
   render() { 
      let route = (
        <Switch>
            <Route path = '/signin' component = {asyncSignIn}/>
            <Route path = '/' exact component = {BurgerBuilder}/>           
            <Redirect to ='/'/>
        </Switch>
      )
      if(this.props.isAuthenticated){
          route = (
            <Switch>                
                <Route path = '/checkout' component = {asyncCheckout}/>
                <Route path = '/order' component = {asyncOrder}/> 
                <Route path = '/logout' component = {Logout}/>
                <Route path = '/signin' component = {asyncSignIn}/>
                <Route path = '/' exact component = {BurgerBuilder}/>
                <Redirect to ='/'/>
            </Switch>
          )
      }
      return (
          <React.Fragment>
            <Layout>
                {route}
            </Layout>
          </React.Fragment>
      );
  }
}
const mapStateToProps = state =>{
    return{
        isAuthenticated : state.signUporInReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        RefreshHandler : () => dispatch(actionCreators.RefreshData()),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
