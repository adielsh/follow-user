
'use strict';

var Follow = require('../model/followModel.js');

exports.create_follow = function(req, res) {
    var new_follow = new Follow(req.body);
    //handles null error
    if(!new_follow.user_id || !new_follow.follow_id){
        console.log(req.body)
        res.status(400).send({ error:true, message: 'Please provide user_id/follow_id' });
    }
    else{
        Follow.createFollow(new_follow, function(err, follow) {
            if (err)
                res.send(err);
            res.json(follow);
        });
    }
};

exports.delete_follow = function(req, res) {
    Follow.removeFollow( req.params.followId, function(err, follow) {
        if (err)
            res.send(err);
        res.json({ message: 'Follow successfully deleted' });
    });
};
