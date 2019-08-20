'use strict';
module.exports = function (app) {
    var user = require('../controller/userController');
    var follow = require('../controller/followController');

    // app Routes
    app.route('/users/:userId')
        .get(user.list_all_users)
    app.route('/follows')
        .post(follow.create_follow)
    app.route('/follows/:followId')
        .delete(follow.delete_follow);
};
