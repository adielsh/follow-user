'use strict';

var User = require('../model/userModel.js');

exports.list_all_users = function(req, res) {
    User.getAllUsers(req.params.userId,function(err, users) {
        if (err)
            res.send(err);
        console.log('res', users);
        res.send(users);
    });
};



