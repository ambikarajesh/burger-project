import React from 'react';
import classes from './Layout.module.css';
import ToolBar from '../../Components/ToolBar/ToolBar';
import SideBar from '../../Components/SideBar/SideBar';
import {connect} from 'react-redux';
class Layout extends React.Component{
    state = {
        showSideBar : false,
    }
    ToggleButtonHandler = () => {
        const showSideBar = this.state.showSideBar;
        this.setState({showSideBar:!showSideBar})
    }
    
    HideBackDrop = () => {
        this.setState({showSideBar:false});
    }

    render(){
        return(
            <React.Fragment>
                <ToolBar Click = {this.ToggleButtonHandler} isAuthenticated = {this.props.isAuthenticated}/>                
                <SideBar show = {this.state.showSideBar} Click = {this.HideBackDrop}  isAuthenticated = {this.props.isAuthenticated}/>                               
                <main className = {classes.Content}>{this.props.children}</main>
            </React.Fragment>
        );
    }   
}
const mapStateToProps = state =>{
    return{
        isAuthenticated:state.signUporInReducer.token !== null,
    }
}
export default connect(mapStateToProps)(Layout);