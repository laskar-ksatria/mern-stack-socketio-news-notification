const User = require('../models/user');
const News = require('../models/news');
const UserNotif = require('../models/userNotif');
const { checkPass } = require('../helpers/hashPass')
const { generateToken } = require('../helpers/jwt')

class Controller {

    static readAllUser(req,res,next) {
        User.find({})
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => res.status(500).json({message: 'Upps something wrong'}))
    };

    static createUser(req,res,next) {
        let { username, password } = req.body;
        console.log(req.body)
        User.create({username, password})
            .then(function(user) {
                res.status(200).json(user)
            })
            .catch(err => console.log(err))
    };

    static loginUser(req,res,next) {
        let { username, password } = req.body;
        User.findOne({username})
            .then(user => {
                if (user) {
                    checkPass(password, user.password, (err, result) => {
                        if (err) {
                            res.status(500).json({message: 'Upps, something wrong'})
                        }else {
                            if (result) {
                                let payload = {id: user.id}
                                generateToken(payload, (err, token) => {
                                    if(err) {
                                        res.status(500).json({message: 'Upps, something wrong'})
                                    }else {
                                        res.status(200).json({token, message: 'Thank you'});
                                    }
                                })
                            }else {
                                res.status(500).json({message: 'Invalid email / password'})
                            }
                        }
                    })
                }else {
                    res.status(500).json({message: 'Invalid email / password'})
                }
            })
    };

    static readAllNews(req,res,next) {
        News.find({})
            .then(newss => {
                res.status(200).json(newss)
            })
            .catch(err => res.status(500).json({message: 'Upps something wrong'}))
    };

    static readMyAccount(req,res,next) {
        User.findOne({_id: req.decoded.id})
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => res.status(500).json({message: 'Ooopss, something wrong'}))
    }

    static createNews(req,res,next) {
        let Io = req.Io;
        let { title, description } = req.body;
        let sendNews;
        News.create({title, description})
            .then(value => {
                sendNews = value;
                return User.find({})
            })
            .then(users => {
                let sendingNews = [];
                users.forEach(user => {
                    sendingNews.push(UserNotif.create({title, description, user: user.id}))
                });
                return Promise.all(sendingNews)
            })
            .then(values => {
                Io.emit('news-notif', values);
                res.status(200).json(sendNews);
            })
            .catch(err => res.status(500).json({message: 'Upps something wrong'}))
    };


    static readAllUserNotif(req,res,next) {
        UserNotif.find({})
            .then(values => {
                console.log(values)
                res.status(200).json(values)
            })
            .catch(err => res.json(500).json({message: "upps something wrong"}))
    };

    static readMyNews(req,res,next) {
        let userId = req.decoded.id;
        UserNotif.find({user: userId})
            .then(mynews => {
                res.status(200).json(mynews);
            })
            .catch(err => res.status(500).json({message: 'Upps, something going wrong'}))
    };

    static updateRead(req,res,next) {
        console.log(req.params.notifId);
        let notifId = req.params.notifId;
        UserNotif.updateOne({_id: notifId}, {read_status: true})
            .then(() => {
                res.status(201).json({message: 'News has been read'})
            })
            .catch(err => res.status(500).json({message: "Upps, Something going wrong"}))
    };

    

};

module.exports = Controller;