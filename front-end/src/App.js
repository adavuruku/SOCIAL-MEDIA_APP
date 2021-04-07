import axios from 'axios';

import React,{Component} from 'react';

class App extends Component {

	state = {
        // Initially, no file is selected
        selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
	};
	
	// On file upload (click the upload button)
	onFileUpload = async () => {
        // Create an object of formData
        const formData = new FormData();
        
        // Update the formData object
        formData.append(
            "coverImage",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        
        // Details of the uploaded file
        console.log(formData);
        
        // Request made to the backend api
        // Send formData object
        // let upload = await axios.post("https://millewise.herokuapp.com/api/user/update/coverimage", formData,{
        //     headers: {
        //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJhYWJkdWxyYWhlZW1zaGVyaWZAZ21haWwuY29tIiwidXNlcklkIjoiNjA1NTI2YTExMGIxOWI3MjMwMzhmYWVhIiwiaWF0IjoxNjE2MjM4Nzk0fQ.AP5oi3Fkwj_hbUSAZ92Eqia9XQk0Biev63vSI5USybk'
        //     }
        //   });

        //   console.log(upload)
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
			<h2>File Details:</h2>
            <p>File Name: {this.state.selectedFile.name}</p>
            <p>File Type: {this.state.selectedFile.type}</p>
            <p>
                Last Modified:{" "}
                {this.state.selectedFile.lastModifiedDate.toDateString()}
			</p>
		</div>
		);
	} else {
		return (
		<div>
			<br />
			<h4>Choose before Pressing the Upload button</h4>
		</div>
		);
	}
	};
	
	render() {
	
	return (
		<div>
			<h1>
			GeeksforGeeks
			</h1>
			<h3>
			File Upload using React!
			</h3>
			<div>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Upload!
				</button>
			</div>
		{this.fileData()}
		</div>
	);
	}
}

export default App;