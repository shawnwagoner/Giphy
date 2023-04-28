import React, {useState} from 'react';
import {useUserContext} from '../context/UserContext';
import Button from '../styles/elements/Button';
function LoginPage () {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const {setUser} = useUserContext();

    const handleLogin = (e) => {
        e.preventDefault();
        setUser({username});
        console.log('user', username);
    }

    return (
    
    <div>
        <form>
            <label>
                Username:
                <input type="text" onChange={(e) => {setUsername(e.target.value)}}></input>
            </label>
            <label>
                Password:
                <input type="password" onChange={(e) => {setPassword(e.target.value)}}></input>
            </label>
            <Button type="submit" onClick={handleLogin}>Submit</Button>
        </form>
        </div>
    
        );
}

export default LoginPage;