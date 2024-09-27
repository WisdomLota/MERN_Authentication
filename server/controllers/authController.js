const User = require('../models/user.js')
const { hashPassword, comparePassword} = require('../helpers/auth.js');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('Test is working');
}

//Register endpoint
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        //check if name was entered
        if (!name) {
            res.json ({
                error: 'name is required'
            })
        };
        //check if password is good
        if (!password || password.length < 6) {
            return res.json ({
                error: 'Password is required and should be at least 6 characters long'
            })
        };
        //check email
        const exist = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } })
        if(exist) {
            return res.json({
                error: 'Email is taken already'
            })
        };

        const hashedPassword = await hashPassword(password);
        //create the user in the database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        })
        return res.json(user)
    } catch(error) {
        console.log(error);
    }
}


//login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }

        //check if passwords match
        const match = await comparePassword(password, user.password);
        if(match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            })
        } 
        if (!match) {
            return res.json({
                error: 'Passwords do not match'
            })
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    test, 
    registerUser,
    loginUser
}