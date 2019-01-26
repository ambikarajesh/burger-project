import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as APIkeys from '../../APIkeys/APIkeys';
export const  SignUporInStart = () =>{
    return {
        type: actionTypes.SIGNUPORIN_START,
    }   
}
export const  SignUporInSuccess = (token, userId) =>{
    return {
        type: actionTypes.SIGNUPORIN_SUCCESS,
        token:token,
        userId:userId
    }   
}

export const  SignUporInFail = (error) =>{
    return {
        type: actionTypes.SIGNUPORIN_FAIL,
        error:error
    }   
}

export const Logout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('expireDate')
    return {
        type:actionTypes.LOGOUT,
        
    }
}

export const SetAuthPath = (path) =>{
    return{
        type:actionTypes.SET_AUTH_PATH,
        path:path
    }
}

export const SignUporInTimeOut = (time) => {
    return dispatch =>{
        setTimeout(()=>{
            dispatch(Logout())
        }, time * 1000)
    }
}

export const SignUporIn = (email, password, isSignUp) =>{
    return dispatch =>{
        dispatch( SignUporInStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIkeys.GoogleAuthAPI}`;
        if(!isSignUp){
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIkeys.GoogleAuthAPI}`;
        }
        axios.post(url, authData).then(res =>{
            localStorage.setItem('idToken',res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            const expireDate = new Date(new Date().getTime()+res.data.expiresIn *1000);
            localStorage.setItem('expireDate', expireDate)
            dispatch(SignUporInSuccess(res.data.idToken, res.data.localId));
            dispatch(SignUporInTimeOut(res.data.expiresIn));
        }).catch(error =>{
            dispatch(SignUporInFail(error.response.data.error));
        })
        
    }   
}

export const RefreshData = () =>{
    return dispatch =>{
        const token = localStorage.getItem('idToken');
        if(!token){
            dispatch(Logout());            
        }
        else{
            let expireTime  = (new Date(localStorage.getItem('expireDate')).getTime()-new Date().getTime())/1000;
            if(expireTime<0){
                dispatch(Logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(SignUporInSuccess(token, userId));
                dispatch(SignUporInTimeOut(expireTime));
            }
        }
    }
}