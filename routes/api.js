const express = require('express');
const router = express.Router();
const user = require('../models/user');
const alumini = require('../models/alumini');
var jwt = require('jsonwebtoken');

var decodedToken = '';
function verifyToken(req, res, next) {
    let token = req.query.token;
    jwt.verify(token, 'secret', function(err, tokenData) {
        if(err) {
            console.log('uothrized request');
        }
        if(tokenData) {
            decodedToken = tokenData;
            next();
        }
    });
}

// user get routes
router.get('/username', verifyToken, (req, res) => {
    return res.json(decodedToken.username);
});

router.get('/users', (req, res) => {
    console.log('get all users');
    user.find({}).exec(function(err, users) {
        if(err) {
            console.log('error on gettig users');
        } else {
            res.json(users);
        }
    });
});

router.get('/user/:id', (req, res) => {
    console.log('get a user');
    user.findById(req.params.id).exec(function(err, user) {
        if(err) {
            console.log('error on gettig user');
        } else {
            res.json(user);
        }
    });
});

// user post routes
router.post('/user', (req, res) => {
    console.log('add a user');
    var newUser = user();
    newUser.email = req.body.email;
    newUser.fullname = req.body.fullname;
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.save(function(err, insertedUser) {
        if(err) {
            console.log('error creating user');
        } else {
            res.json(insertedUser);
        }
    });
});


router.post('/signin', (req, res) => {
    user.findOne({email: req.body.email, password: req.body.password}).exec(function(err, data) {
        if(err || data==null) {
            console.log('user not registerd');
        } else {
            let token = jwt.sign({username: data.username}, 'secret', {expiresIn: '3h'});
            res.json(token);
        }
    });
});

// alumini get routes

router.get('/aluminies', (req, res) => {
    console.log('get all aluminies');
    alumini.find({}).exec(function(err, aluminies) {
        if(err) {
            console.log('error on gettig aluminies');
        } else {
            res.json(aluminies);
        }
    });
});

router.get('/alumini/:id', (req, res) => {
    console.log('get an alumini');
    alumini.findById(req.params.id).exec(function(err, alumini) {
        if(err) {
            console.log('error on gettig alumini');
        } else {
            res.json(alumini);
        }
    });
});

// alumini post routes

router.post('/alumini', (req, res) => {
    console.log('add an alumini');
    var newAlumini = alumini();
    newAlumini.email = req.body.email;
    newAlumini.fullname = req.body.fullname;
    newAlumini.linkedin = req.body.linkedin;
    newAlumini.contact = req.body.contat;
    newAlumini.department = req.body.department;
    newAlumini.currentjob = req.body.currentjob;
    newAlumini.passoutyear = req.body.passoutyear;
    newAlumini.save(function(err, insertedAlumini) {
        if(err) {
            console.log('error creating alumini');
        } else {
            res.json(insertedAlumini);
        }
    });
});

router.put('/user/:id', (req, res) => {
    user.findByIdAndUpdate(req.params.id, 
        {
            email: req.body.email, 
            fullname: req.body.fullname, 
            username: req.body.username, 
            password: req.body.password
        },
        function(err, updatedUser) {
            if(err) {
                console.log('error updatig user');
            } else {
                res.json(updatedUser);
            }
    });
});

router.put('/alumini/:id', (req, res) => {
    alumini.findByIdAndUpdate(req.params.id, 
        {
            email: req.body.email,
            fullname: req.body.fullname,
            linkedin: req.body.linkedin,
            contact: req.body.contat,
            department: req.body.department,
            currentjo: req.body.currentjob,
            passoutyear: req.body.passoutyear
        },
        function(err, updatedAlumini) {
            if(err) {
                console.log('error updatig alumini');
            } else {
                res.json(updatedAlumini);
            }
    });
});

router.delete('/user/:id', (req, res) => {
    console.log('delete a user');
    user.findByIdAndDelete(req.params.id,
        function(err, deletedUser) {
            if(err) {
                console.log('error deleting user');
            } else {
                res.json(deletedUser);
            }
        });
});

router.delete('/alumini/:id', (req, res) => {
    console.log('delete an alumini');
    alumini.findByIdAndDelete(req.params.id,
        function(err, deletedAlumini) {
            if(err) {
                console.log('error deleting alumini');
            } else {
                res.json(deletedAlumini);
            }
        });
});


module.exports = router;