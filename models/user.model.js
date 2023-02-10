const sql = require("../config/db.js");

const User = (user) => {
    this.id = user.id;
    this.fullname = user.fullname;
    this.username = user.username;
    this.password = user.password;
    this.profile_picture = user.profile_picture;
    this.role = user.role;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
}

User.getAllUser = async (request, result, next) => {
    try {
        await sql.query("SELECT * FROM user;", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                return result.status(400).send({ error: err, data: null, message: "Error getting data" });
            }

            if (res.length) {
                console.log("found patient: ", res);
                return result.status(200).send({ error: false, data: res, message: "List all user" });
            }

        })
    } catch (error) {

    }
};

User.getByUsernameAndPassword = async (request, result, next) => {
    try {
        await sql.query("SELECT * FROM patient JOIN (SELECT * FROM user WHERE username = ? AND password = ?) as us ON patient.user_id = us.id;", [request.body.username, request.body.password], (err, res) => {
            if (err) {
                console.log("Error: ", err);
                return result.status(400).send({ error: err, data: null, message: "Error getting data" });
            }

            if (res.length) {
                console.log("found patient: ", res);
                return result.status(200).send({ exist: true, data: res, message: "List all user" });
            } else {
                return result.status(200).send({ exist: false, data: null, message: "List all user" });
            }

        })
    } catch (error) {

    }
};

module.exports = User;