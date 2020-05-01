import React from 'react';
import { useHistory } from 'react-router-dom';
import { myNews } from '../function';
import Notification from '../components/Notification'

const Main = () => {

    let history = useHistory();

    const logout = () => {
        localStorage.removeItem('merntoken')
        history.push('/')
    };

    return (
        <div>
            <h1>Hallo</h1>
            <br />
            <button onClick={logout}>logout</button>
            <div style={{marginTop: '20px'}}>
                <Notification  />
            </div>
        </div>
    )
};

export default Main;