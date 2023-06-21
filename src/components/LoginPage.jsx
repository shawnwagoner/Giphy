import React, { useState} from 'react';
import {useUserContext} from '../context/UserContext';
import axios from 'axios';
import { initializeApp } from 'firebase/app';


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import e from 'express';

const LoginPage = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyBAwkiacFtwDX4FtMUW9tgaj1PUwl6ImdU",
        authDomain: "giphy-project-690ae.firebaseapp.com",
        projectId: "giphy-project-690ae",
        storageBucket: "giphy-project-690ae.appspot.com",
        messagingSenderId: "679205866737",
        appId: "1:679205866737:web:4ac084646f55920772ed50",
        measurementId: "G-4VTG74MC6L"
      };

    const app = initializeApp(firebaseConfig);
    

      
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {setUser} = useUserContext();
    
    const auth = getAuth();

    const googleSignIn = () => {
        e.preventDefault();

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            setUser({username: user.displayName});
    })
    .catch((error) => {
    const errorMessage = error.message;
    setError(errorMessage);
  })
}


    let reqURL;

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3006/login', {
            username: username, password: password});
        if (response.status === 200){
            setUser({username});
        } else {
            console.log('Error logging in');
    }}
    catch (error) {
        console.log(error);
    }
    };

    return (
    
    <div>
        <form>
            <label>
                Username:
                <input
                placeholder= "Username" 
                type="text" onChange={(e) => {setUsername(e.target.value)}}></input>
            </label>
            <label>
                Password:
                <input
                placeholder= "Password"
                 type="password" onChange={(e) => {setPassword(e.target.value)}}></input>
            </label>
            <button    
            disabled={username.length < 4 || password.length < 4}
            onClick={(e) => {handleLogin(e);
            }}
            >Login</button>
            <button onClick={(e) => {googleSignIn(e)}}>Log in with Google</button>
        </form>
        </div>
    
        );
}

export default LoginPage;