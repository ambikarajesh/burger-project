import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/Actions/indexActionCreator';
import {Redirect} from 'react-router-dom';
class Logout extends React.Component{
    componentDidMount(){
        this.props.LogoutHandler();
    }
    render(){
        console.log('called')
        return <Redirect to ='/'/>;
    }
}


const mapDispatchToProps = dispatch =>{
    return{
            LogoutHandler : () => dispatch(actionCreators.Logout())
    }
}


export default connect(null,mapDispatchToProps)(Logout);