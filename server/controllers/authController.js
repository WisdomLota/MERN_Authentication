const User = require('../models/user.js')

const test = (req, res) => {
    res.json('Test is working');
}

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
        const exist = await User.findOne({email})
        if(exist) {
            return res.json({
                error: 'Email is taken already'
            })
        };

        //create the user in the database
        const user = await User.create({
            name, email, password
        })
        return res.json(user)
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    test, 
    registerUser
}