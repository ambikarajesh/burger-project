import React from 'react';
import classes from './Modal.module.css';
import BackDrop from './BackDrop/BackDrop';
class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState){
        
        return (nextProps.show !== this.props.show)  && (nextProps.children !== this.props.children);
    }

   
    render(){
        
        const styles = this.props.show ? {opacity : '1', transform:'translateY(0)'} : {opacity :'0', transform:'translateY(-100px)'};    
        return(
            <React.Fragment>
                <BackDrop show = {this.props.show} Clicked = {this.props.Click}/>
                <div className = {classes.Modal} style = {styles}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;