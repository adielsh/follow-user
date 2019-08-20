'user strict';
var sql = require('./db.js');

//Task object constructor
var User = function(user){
    this.name = user.name;
    this.group_id = user.group_id;
    this.followers_count = user.followers_count;
};
User.getAllUsers = function (id,result) {
    console.log(id,"idididid")
    sql.query(
        "SELECT mydb.users.*, mydb.groups.name AS group_name, pp.follow_id AS my_follow, pp.id AS follow_id FROM users\n"+
    "LEFT JOIN mydb.groups ON mydb.groups.id=users.group_id\n"+
    "LEFT JOIN\n"+
    "(SELECT * from mydb.follows WHERE user_id=?) AS pp\n"+
    "ON pp.follow_id = users.id\n"+
        "ORDER BY id"
        ,[id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('users : ', res);

            result(null, res);
        }
    });
};
module.exports= User;
