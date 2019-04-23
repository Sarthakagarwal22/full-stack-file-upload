import axios from 'axios';
import bcrypt from 'bcryptjs';
import history from '../history'

const CancelToken = axios.CancelToken;

const loader = progress => ({
	type:'LOADER',
	progress,
});

export const uploadFileFail = () =>({
	type:'UPLOAD_FILE_FAIL'
});

export const uploadFileLoading = (status) => ({
	type:'UPLOAD_FILE_LOADING',
	status
});

export const uploadFileSuccess = () => ({
	type: 'UPLOAD_FILE_SUCCESS'
});

const uploadFileHistory = (files) => ({
	type:'UPLOAD_FILE_HISTORY',
	files
})

export const uploadFileCancel = (status) => ({
	type: 'UPLOAD_FILE_CANCEL',
	status
});

export const updateCancellationToken = () => ({
	type: 'UPDATE_CANCELLATION_TOKEN',
	source: new CancelToken.source()
})

export const loginSuccessful = () => ({
	type: 'LOGIN_SUCCESS',
});

const usernameMismatch = () => ({
	type: 'LOGIN_UNSUCCESS'
});

export const showLoginError = (message) => ({
	type: 'SHOW_LOGIN_ERROR',
	message
});

const usernameExists = () => ({
	type: 'USERNAME_EXISTS',
});

const registerationSuccessful = () => ({
	type: 'REGISTERATION_SUCCESSFUL'
});

const showRegisterationError = (message) => ({
	type: 'SHOW_REGISTERATION_ERROR',
	message
});

export const validateEmail = (email) => ({
	type: 'VALIDATE_EMAIL',
	email
});

export const validatePass = (pass) => ({
	type: 'VALIDATE_PASSWORD',
	pass
});

const loginSucceeded = () => ({
	type:"LOGIN_SUCCEEDED"
}); 


export function uploadFiles(files,Sourcetoken) {
	  	var data = new FormData();
  		Object.keys(files).map(function(key, index){
  			data.append('file',files[key],files[key].name,files[key].webkit)
  			return null; 
  		});
  		return dispatch => {
    const uploadProgress = {
      onUploadProgress: (ProgressEvent) => {
        let progressData = 0;
          progressData = Math.round((ProgressEvent.loaded * 100) / (ProgressEvent.total));
        dispatch(loader(progressData));
      },
    };
    var config = {
		headers: {'Content-Type': 'multipart/form-data' },
		cancelToken: Sourcetoken.token 
	}
    const configPlusProgress = Object.assign(uploadProgress, config);
    const request = () => axios.post("http://localhost:5000/upload", data, configPlusProgress);

    dispatch(uploadFileLoading(true));
    return request()
      .then((response) => {
        if (response.status !== 200) {
          dispatch(uploadFileLoading(false));
          dispatch(uploadFileFail());
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => {
      	dispatch(uploadFileSuccess(true));
      	dispatch(uploadFileHistory(files));
      	})
      .catch(function (thrown) {
        if (axios.isCancel(thrown)) {
        	dispatch(uploadFileCancel(true))
    	}
    	else
    		dispatch(uploadFileLoading(false));
    		dispatch(uploadFileFail());
    	});	
  };
}

export function login(username,password){
	var data = {};
	data.username = username;
	data.password = password;
	var config = {
		headers: {'Content-Type': 'application/json' }
	}
	return dispatch =>{
		axios.post('http://localhost:5000/authenticate',data,config)
		.then((response) => {
			if(response.status === 200){
				dispatch(loginSucceeded());
				history.push("/");
			}
		}).catch(err => {
			if(err.response){
				if(err.response.status === 305){
					dispatch(usernameMismatch())
				}
			}
			else {
				dispatch(showLoginError(err.message));
			}
		});
	};
}

export function register(user,pass,first_name,last_name){
	var data = {};
	data.username = user;
	data.hash = bcrypt.hashSync(pass, 10);
	data.firstName = first_name;
	data.lastName = last_name;
	var config = {
		headers: {'Content-Type': 'application/json' }
	}
	return dispatch =>{
		axios.post('http://localhost:5000/register',data,config)
		.then((response) => {
			if(response.status === 200){
				dispatch(registerationSuccessful());
			}
			else if(response.status === 301){
				dispatch(usernameExists());
			}
		}).catch(err => {dispatch(showRegisterationError(err.response.data.msg))});
	};
}









