const express = require("express");
const {
    checkToken
} = require("../auth/verify_token");
const router = express.Router();
const {
    createUserController,
    getUserbyIdController,
    getAllUser,
    loginController,
    logoutController
} = require("./controller");


router.post('/login', loginController);
router.post('/register', createUserController);
router.get('/logout', logoutController);

// Auth routes 
router.get('/user', checkToken, getAllUser);
router.get('/:id', checkToken, getUserbyIdController);

module.exports = router;