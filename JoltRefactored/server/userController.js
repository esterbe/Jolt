const express = require('express');
const router = express.Router();
const fs      = require("fs");
const DB = require('./db');


export default class UserController {
    getCurrentUser() {
        if (req.cookie.user) {
            res.json(req.cookie.user);
        } else {
            //ETY: no need to throw exception here.
            //just return an empty object if there isno current user
            //throw "Error! not logged in!"
            return {};
        }
    }

    login() {
        return Promise((resolve, reject) => {
            let user = req.body.user,
                pass = req.body.pass;
            DB.query('SELECT * FROM users WHERE user= ? AND password= ?', [user, pass], function (data, error) {
                if (error) reject(error);

                if (~(JSON.parse(fs.readFileSync("./admins.txt")).indexOf(req.query.user))) {
                    res.cookie("user", JSON.stringify(user));
                }
                resolve(res.json(user));
            });
        });
    }

}

