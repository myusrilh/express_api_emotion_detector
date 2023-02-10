const sql = require('../config/db.js');

// constructor
const Patient = (patient) => {
    this.id = patient.id;
    this.user_id = patient.user_id;
    this.tingkat_stress = patient.tingkat_stress;
    this.status = patient.status;
    this.created_at = patient.created_at;
    this.updated_at = patient.updated_at;

};

Patient.getAllPatient = async (request, result, next) => {
    try {
        await sql.query("SELECT patient.id, patient.user_id, patient.tingkat_stress, user.fullname, user.username, user.profile_picture, user.role, patient.created_at, patient.updated_at FROM patient JOIN user ON patient.user_id = user.id;", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                return result.status(400).send({ error: err, data: null, message: "Error getting data" });
            }

            if (res.length) {
                console.log("found patient: ", res);
                return result.status(200).send({ exist: false, data: res, message: "List all patient" });
            } else {
                console.log("data not found! =>", { data: null });
                return result.status(200).send({ exist: true, data: null, message: "No data" });
            }

        })
    } catch (error) {
        next(error);
    }
};
Patient.getPatientByUserID = async (request, result, next) => {
    try {
        await sql.query("SELECT patient.id, patient.user_id, patient.tingkat_stress, user.fullname, user.username, user.profile_picture, user.role, patient.created_at, patient.updated_at FROM patient JOIN user ON patient.user_id = user.id WHERE user.id = ?;", [request.params.id], (err, res) => {
            if (err) {
                console.log("Error: ", err);
                return result.status(400).send({ error: err, data: null, message: "Error getting data" });
            }

            if (res.length) {
                console.log("found patient: ", res);
                return result.status(200).send({ exist: false, data: res, message: "List all patient" });
            } else {
                console.log("data not found! =>", { data: null });
                return result.status(200).send({ exist: true, data: null, message: "No data" });
            }

        })
    } catch (error) {
        next(error);
    }
};



module.exports = Patient;