import './App.css';
import React, {useState} from 'react';

function App() {
    //JS Part of App.js
    const [error, setError] = useState("noerror")
    const [message, setMessage] = useState("nomessage")
    const [file, setFile] = useState("nofile")

    const onFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const uploadFile = (event) => {
        setError("")
        setMessage("")

        let data = new FormData()
        data.append('file', file)
        data.append('name', file.name)

        fetch('http://localhost:8080/api/files', {
            method: 'POST', body: data
        }).then(response => {
            setError('')
            setMessage('Sucessfully uploaded file');
        }).catch(err => {
            setError(err)
        })
    }

    return (//HTML Part
        <div className="Upload">
            <h2>Upload a file</h2>
            <h4 style={{color: 'red'}}>{error}</h4>
            <h4 style={{color: 'green'}}>{message}</h4>
            <input onChange={onFileChange} type="file"></input>
            <button onClick={uploadFile}>Upload</button>
        </div>);
}

export default App;
