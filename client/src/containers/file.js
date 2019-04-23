import { connect } from 'react-redux';
import { uploadFiles,uploadFileLoading,uploadFileFail,uploadFileCancel, updateCancellationToken } from '../actions';
import FileUpload from '../components/App';

const mapStatetoProps = state =>({
	progress: state.progress,
	fileUploadingStatus: state.uploadFileLoading,
	fileUploadSuccessful: state.fileUploadSuccess,
	uploadFileCancelled: state.uploadFileCancel,
	cancellationSource: state.cancellationToken,
	uploadFileHistory: state.uploadFileHistory
})

const mapDispatchtoProps = (dispatch) => ({
	reset: ()=> {
		dispatch(uploadFileCancel(false));
		dispatch(uploadFileLoading(false));
		dispatch(uploadFileFail());
		},
	filesUpload: (files,cancellationToken)=>{	
		dispatch(uploadFiles(files,cancellationToken));
	},
	updateCancellationToken: ()=>{
		dispatch(updateCancellationToken());
	}
});

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(FileUpload);