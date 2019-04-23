import React from 'react';
import './App.css'

const FileUpload = ({progress, dispatch, fileUploadingStatus, fileUploadSuccessful, uploadFileCancelled, cancellationSource, uploadFileHistory, reset, filesUpload, updateCancellationToken}) => {

	let inputfiles;
	let inputfolder;

	return(
		<div className="main_app">
		<label>
			Upload file(s)
			&nbsp;&nbsp;&nbsp;
			<input 
				className="input_files"
				ref={node => inputfiles=node} 
				name="fileInput" 
				type="file" 
				multiple 
				onChange={(event)=>{reset();filesUpload(inputfiles.files,cancellationSource)}}
			/>
		</label>
		<label>
			Upload Folder
			&nbsp;&nbsp;&nbsp;
			<input 
				className="input_folder"
				type="file" 
				ref={node => inputfolder = node} 
				webkitdirectory="true" 
				mozdirectory="true" 
				onChange={(event)=>{reset();filesUpload(inputfolder.files,cancellationSource)}}
			/>
		</label>
		<br />
		<br />
		{fileUploadingStatus && !uploadFileCancelled &&	<div>
			<div className="progressbar_outer">
			<div className="progressbar_inner" style={{width:progress*2.4+'px'}}></div>
			</div>
			<h2>{progress} %</h2>
			{fileUploadingStatus &&  !fileUploadSuccessful && <button onClick={() => {cancellationSource.cancel();updateCancellationToken();}}> Cancel Upload </button>
			}
			{
				fileUploadSuccessful && <p>Upload Successful</p>
			}
		</div>
		}
		{!fileUploadSuccessful && !fileUploadingStatus && !uploadFileCancelled && 
			<h4> Sorry for incovenience... Our Servers seems to be facing some issue</h4>
		}
		{
			uploadFileCancelled && <h3>You cancelled the upload request</h3>
		}
		{
			uploadFileHistory.length>0 && <div>
			<h2>Recent Uploads</h2>
			<table className="recent_uploads_table">
			<tr>
				 	<td colSpan="4">Uploaded File Name</td>
				 	<td>File Upload Date</td>
			</tr>
			{uploadFileHistory.map((file,index) =>
				<tr key={index}>
				 	<td colSpan="4"><p className="uploaded_file_name">{file.fileName}</p></td>
				 	<td><p className="uploaded_file_date_time">{file.date}</p></td>
				</tr>
			)
			}
			</table>
			</div>
		}
		</div>	
	)
}

export default FileUpload;
