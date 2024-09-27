const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser } = require('../controllers/authController.js')

//middleware

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173' //this url is where the frontend is on my web browser
    })
)

router.get('/', test); //this test is a function created in my authController
router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router; 