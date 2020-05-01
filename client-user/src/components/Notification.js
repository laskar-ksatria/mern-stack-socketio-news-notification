import React from 'react';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import { myNews, myAccount } from '../function';
import SocketIo from 'socket.io-client';
import axios from 'axios';
let socket;

class Notification extends React.Component {
    
    state = {
        toggle: false,
        read: [],
        show: false,
        userId: ''
    };
    
    componentDidMount() {
        let ENDPOINT = 'http://localhost:3010';
        socket = SocketIo(ENDPOINT);

        socket.on('news-notif', data => {
            let newData = this.state.read;
            let userId = this.state.userId;
                data.forEach(item => {
                    if (item.user === userId) {
                        newData.push(item)
                    }
                })
                this.setState({read: newData});
                console.log(newData);
        })

        const el = findDOMNode(this.refs.toggle);
        if (!this.state.toggle) {
            $(el).hide();
        };
        
        //Function
        myNews((err, data) => {
            if (err) {
                console.log(err);
            }else {
                this.setState({news: data});
                let myread = [];
                data.forEach(item => {
                    if (!item.read_status) {
                        myread.push(item)
                    }
                })
                this.setState({read: myread});
                this.setState({userId: myread[0].user})
            }
        });

        //getMyAccount
        myAccount((err, data) => {
            if (err) {
                console.log(err)
            }else {
                this.setState({userId: data._id});
            }
        })


    };

    changeBadgeNotif = (id) => {
        let badge = this.state.read;
        let newBadge = [];
        badge.forEach(item => {
            if (item._id !== id) {
                newBadge.push(item)
            }
        })
        this.setState({read: newBadge});
    }

    toggleShow = () => {
        this.setState({toggle: true});
        this.setState({show: !this.state.show})
        const el = findDOMNode(this.refs.toggle)
        $(el).slideToggle();
    }

    render() {
            return (
                <div>
                    <Badge badgeContent={this.state.read.length} color="secondary">
                    <Button onClick={this.toggleShow} variant="contained" color="primary">           
                    <Typography>You have {this.state.read.length} Unread notification</Typography>
                    </Button>
                    </Badge>
                    {this.state.show ? <p>Click button to close notification list</p> : <p>Click button to open notification list</p>}
                    <hr />
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", backgroundColor: "lightblue"}}>
                        <div ref="toggle">
                            <ListNotification read={this.state.read} changeBadgeNotif={this.changeBadgeNotif} />
                        </div>
                    </div>
                </div>
            )

    }
};


const ListNotification = (props) => {


    return props.read.map((item, index) => {
        const updateNotifRead = () => {
            axios({
                url: `http://localhost:3010/myNews/${item._id}`,
                method: 'PATCH',
                headers: {
                    usertoken: localStorage.getItem('merntoken')
                }
            })
            .then(({data}) => {
                props.changeBadgeNotif(item._id);
            })
            .catch(err => alert('Oopss, Something wrong'))
        }

        let back = "lightyellow"

        return (
            <div style={{width: '70%',marginBottom: '10px', padding: '10px'}} key={index} style={{backgroundColor: back, width: '100%'}}>
                <h3>{index + 1}. title: {item.title}, description: {item.description}</h3>
                {item.read_status ? "" : <button onClick={updateNotifRead} style={{width: '60px', height: '30px', cursor: 'pointer'}}>Read</button>}
            </div>
        )
    })
}


export default Notification;