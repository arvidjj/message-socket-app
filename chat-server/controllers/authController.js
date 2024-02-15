const bcrypt = require('bcrypt');
const User = require('../models/user')
const { body, validationResult } = require('express-validator');
const authController = {};
const passport = require('passport');
const jwt = require('jsonwebtoken');

authController.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        
        // create user dboject without password and email and id
        const userObject = user.toObject();
        delete userObject.password;
        delete userObject.email;
        
        jwt.sign({ user: user }, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
            res.cookie('jwauth', token, { 
                httpOnly: true,
                secure: false,
                maxAge: 3600000, 
                path: '/',
            });
            return res.json({ token, user: userObject});
        });
    })(req, res, next);
}

authController.logout = (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
}


module.exports = authController;
