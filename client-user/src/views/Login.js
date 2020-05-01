import React from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { login } from '../function';

const Login = () => {

    let history = useHistory();

    const [loginData, setLoginData] = React.useState({username: '', password: ''});
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        login({username: loginData.username, password: loginData.password}, (err, data) => {
            if(err) {
                setLoading(false);
                console.log(err)
            }else {
                setLoading(false);
                localStorage.setItem('merntoken', data.token);
                alert(data.message);
                history.push('/main');
            }
        })
    }
    
    return (
        <>
           {loading ? <h1>Loading...</h1> :  <form onSubmit={handleSubmit} style={{marginTop: '100px'}}>
                <h4>Login</h4>
                <input name="username" type="text" onChange={handleChange} placeholder="Enter username" />
                <br />
                <input name="password" type="password" onChange={handleChange} placeholder="Enter password" />
                <br />
                <button type="submit" style={{marginTop: '10px', width: '100px', cursor: 'pointer'}}>Login</button>
                <br />
                <Link to="/register">Register</Link>
            </form>}
        </>
    )

};

export default Login;