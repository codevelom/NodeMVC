const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    createUserService,
    getUserbyIdService,
    getAllUserService,
    loginService,
    storeAccessTokenService,
    getStoredTokenService,
    deleteExpiredTokenService
} = require("./services");

module.exports = {
    createUserController: (req, res) => {
        const body = req.body;
        body.password = bcrypt.hashSync(body.password, 10);
        createUserService(body, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    status: 0,
                    message: 'Ops! An error occured.'
                });
            }

            return res.status(200).json({
                status: 1,
                data: result
            });
        });
    },

    // get user by ID

    getAllUser: (req, res) => {
        // if (req.header.authorization) {
        console.log(req.header.authorization);
        getAllUserService((err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 0,
                    message: "An error occured."
                });
            }

            if (!result) {
                return res.status(500).json({
                    status: 0,
                    message: "No record found"
                });
            }

            return res.status(200).json(result);
        });
        // }

    },
    // get user by ID

    getUserbyIdController: (req, res) => {
        let param = req.params.id;
        // if (req.header.authorization) {
        console.log(req.header.authorization);
        getUserbyIdService(param, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 0,
                    message: "An error occured."
                });
            }

            if (!result) {
                return res.status(500).json({
                    status: 0,
                    message: "No record found"
                });
            }
            if (result) {
                result.password = undefined;
                return res.status(200).json(result);
            }

        });
        // }

    },

    // User login
    loginController: (req, res) => {
        const body = req.body;
        let fetchPass, userID = null;
        let date = new Date();
        const time = date.getTime() + 3600;

        loginService(body.email, (err, result) => {
            if (err) {
                console.log(err)
            }

            if (!result) {
                return res.status(401).json({
                    status: 0,
                    data: "Invalid email/password."
                });
            }

            Object.keys(result).forEach((key) => {
                const rows = result[key];
                fetchPass = rows.password;
                userID = rows.id;
            });

            // decrypt user password
            const results = bcrypt.compareSync(body.password, fetchPass);

            if (results) {
                result.password = undefined;
                const jwtoken = jwt.sign({
                    results: result
                }, process.env.APP_KEY, {
                    expiresIn: "1m"
                });


                // res.setHeader("authorization", "Bearer " + jwtoken);
                return res.status(200).json({
                    status: 1,
                    message: "Login successful.",
                    token: jwtoken
                });
            } else {
                return res.status(401).json({
                    status: 0,
                    data: "Invalid email/password."
                });
            }

        });
    },

    logoutController: (req, res) => {
        // res.setHeader('authorization', 'Bearer ' + '');

        res.status(200).json({
            success: 1,
            message: "Logout successful."
        });
    }

}