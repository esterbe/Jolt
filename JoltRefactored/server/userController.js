const express = require('express');
const fs      = require("fs");
const DB = require('./db');


export default class UserController {
    getCurrentUser() {
        if (req.cookie.user) {
            res.json(req.cookie.user);
        } else {
            //ETY: no need to throw exception here.
            //just return null if there is no current user logged in
            //throw "Error! not logged in!"
            return null;
        }
    }

    login() {
        return Promise((resolve, reject) => {
            let user = req.body.user,
                pass = req.body.pass;
            DB.query('SELECT * FROM users WHERE user= ? AND password= ?', [user, pass], (data, error) => {
                if (error) reject(error);

                let retrievedUser = data[0];
                if (~(JSON.parse(fs.readFileSync("./admins.txt")).indexOf(user))) {
                    res.cookie("user", JSON.stringify(retrievedUser));
                }
                resolve(res.json(retrievedUser));
            });
        });
    }

}

