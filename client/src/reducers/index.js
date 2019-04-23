import { combineReducers } from 'redux';
import axios from 'axios';

const CancelToken = axios.CancelToken;
const defsource = CancelToken.source();

const progress = (state = '0', action) => {
  switch (action.type) {
    case 'LOADER':
      return action.progress
    default:
      return state
  }
}

const fileUploadSuccess = (state=true,action) =>{
  switch (action.type){
    case 'UPLOAD_FILE_FAIL':
      return false
    case 'UPLOAD_FILE_SUCCESS':
      return true
    default :
      return state 
  }  
}

const uploadFileHistory = (state=[],action) => {
  switch(action.type){
    case 'UPLOAD_FILE_HISTORY':{
    var files = Object.keys(action.files).map((key)  => ({fileName: action.files[key].name, date: Date().toString().slice(0,-31)}));
    return files.concat(state);
  }
    default :
    return state
  }
} 

const uploadFileLoading = (state=false,action) => {
  switch(action.type){
    case 'UPLOAD_FILE_LOADING':
      return action.status
    default :
     return state  
  }
}

const uploadFileCancel = (state=false,action) => {
  switch(action.type){
    case 'UPLOAD_FILE_CANCEL':
      return action.status
    default :
    return state
  }
}

const cancellationToken = (state=defsource,action) => {
  switch(action.type){
    case 'UPDATE_CANCELLATION_TOKEN':
      return action.source
    default:
    return state
  }
}

const loginSuccessful = (state=true,action) => {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return true
    case 'LOGIN_UNSUCCESS':
      return false
    default :
      return state
  }
}

const validatePass = (state=true,action) => {
  switch(action.type){
    case 'VALIDATE_PASSWORD':
      if(action.pass.length>0)
        return true
      else
        return false
    default:
      return state  
  }
}


const validateEmail = (state=true,action) => {
  switch(action.type){
    case 'VALIDATE_EMAIL':
      var emailValidator = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/
      if(action.email.length>0 && action.email.match(emailValidator))
        return true
      else
        return false
    default :
      return state  
  }
}

const showLoginError = (state="",action) => {
  switch(action.type){
    case 'SHOW_LOGIN_ERROR':
      return action.message
    default :
      return state  
  }
}

const loginSucceeded = (state=false,action) =>{
  switch(action.type){
    case 'LOGIN_SUCCEEDED':
      return true
    default:
      return state; 
  }
}

const updateProgress = combineReducers({
  progress,
  fileUploadSuccess,
  uploadFileLoading,
  uploadFileCancel,
  loginSuccessful,
  uploadFileHistory,
  cancellationToken,
  showLoginError,
  loginSucceeded,
  validateEmail,
  validatePass
});


export default updateProgress;