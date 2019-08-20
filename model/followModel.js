'user strict';
var sql = require('./db.js');

//Task object constructor
var Follow = function (follow) {
    this.user_id = follow.user_id;
    this.follow_id = follow.follow_id;
};
Follow.createFollow = function (newFollow, result) {
    sql.query("INSERT INTO follows set ?", newFollow, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            sql.query("UPDATE users SET number_of_followers = number_of_followers+1 WHERE id = ?", [newFollow.follow_id], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, res.insertId);
                } else {
                    console.log(res.insertId);
                    result(null, res);
                }
            });
        }
    });
};

Follow.removeFollow = function (id, result) {
    var follow_id = null;
    sql.query("SELECT follow_id from mydb.follows where id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            follow_id = res[0].follow_id.toString();
            sql.query("DELETE FROM follows WHERE id = ?", [id], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                    sql.query("UPDATE users SET number_of_followers = number_of_followers - 1 WHERE id = ?", [follow_id], (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                        } else {
                            console.log(res.insertId);
                            result(null, res);
                        }
                    });
                }
            });
        }
    });
};

module.exports = Follow;
