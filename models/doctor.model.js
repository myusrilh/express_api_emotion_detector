const sql = require('../config/db.js');

// constructor
const Doctor = (doctor) => {
    this.id = doctor.id;
    this.user_id = doctor.user_id;
    this.spesialisasi = doctor.spesialisasi;
    this.status = doctor.status;
    this.created_at = doctor.created_at;
    this.updated_at = doctor.updated_at;
};

Doctor.getAllDoctor = async (request, result, next) => {
    try {
        await sql.query("SELECT doctor.id, doctor.user_id, doctor.spesialisasi, doctor.status, user.name, user.profile_picture, user.role, doctor.created_at, doctor.updated_at FROM doctor JOIN user ON doctor.user_id = user.id;", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                return result.status(400).send({ error: err, data: null, message: "Error getting data" });
            }

            if (res.length) {
                console.log("found doctor: ", res);
                return result.status(200).send({ exist: true, data: res, message: 'List all doctor' });
            } else {
                console.log("data not found! =>", { data: null });
                return result.status(200).send({ exist: false, data: null, message: "No data" });
            }

        })
    } catch (error) {
        next(error);
    }
};

module.exports = Doctor;