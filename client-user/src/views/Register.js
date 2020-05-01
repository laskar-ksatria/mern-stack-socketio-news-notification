import React from 'react';
import axios from 'axios';
import  { useHistory, Link } from 'react-router-dom';
import { register } from '../function';

const Register = () => {

    let history = useHistory();

    const [registerData, setRegisterData] = React.useState({username: '', password: ''});
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        let payload = {username: registerData.username, password: registerData.password};
        register(payload, (err, data) => {
            if (err) {
                alert(err.response.data.message);
            }else {
                alert("Thank you for register");
                history.push('/');
            }
        })
    };

    const handleChange = (e) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value});
    };

    return (
        <div style={{marginTop: '100px'}}>
           {loading ? <h1>Loading...</h1> :  <form onSubmit={handleSubmit}>
               <h4>Register</h4>
                <input  name="username" type="text" placeholder="Enter username" onChange={handleChange}/>
                <br />
                <input name="password" type="password" placeholder="Enter password" onChange={handleChange} />
                <br />
                <button style={{marginTop: '10px', width: '100px', cursor: 'pointer'}} type="submit">Submit</button>
                <br />
                <Link to="/">Already have account?</Link>
            </form>}
        </div>
    )

};

export default Register;