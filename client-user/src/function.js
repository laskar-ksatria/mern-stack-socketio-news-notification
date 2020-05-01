import axios from 'axios';

export const login = (data, cb) => {
    axios({
        url: `http://localhost:3010/users/login`,
        method: 'POST',
        data: {
            username: data.username,
            password: data.password
        }
    })
    .then(({data}) => {
        cb(null, data)
    })
    .catch(err => cb(err, null))
};

export const register = (data, cb) => {
    axios({
        url: `http://localhost:3010/users`,
        method: 'POST',
        data: {
            username: data.username,
            password: data.password
        }
    })
    .then(({data}) => {
        cb(null, data);
    })
    .catch(err => cb(err, null))
};

export const myNews = (cb) => {
    axios({
        url: `http://localhost:3010/myNews`,
        method: 'GET',
        headers: {
            usertoken: localStorage.getItem('merntoken')
        }
    })
    .then(({data}) => {
        cb(null, data)
    })
    .catch(err => cb(err, null))
};

export const myAccount = (cb) => {
    axios({
        url: `http://localhost:3010/users/myAccount`,
        method: 'GET',
        headers: {
            usertoken: localStorage.getItem('merntoken')
        }
    })
    .then(({data}) => {
        cb(null, data)
    })
    .catch(err => cb(err, null));
}
