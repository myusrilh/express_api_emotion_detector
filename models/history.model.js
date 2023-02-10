const sql = require('../config/db.js');

// constructor
const History = (history) => {
    this.id = history.id;
    this.patient_id = history.patient_id;
    this.doctor_id = history.doctor_id;
    this.patient_condition = history.patient_condition;
    this.doctor_advice = history.doctor_advice;
    this.date_scan = history.date_scan;
    this.created_at = history.created_at;
    this.updated_at = history.updated_at;

};

History.getAllHistory = async (request, result, next) => {
    try {
        await sql.query("SELECT history.id, user_pat.name AS patient_name, user_doc.name AS doctor_name, history.patient_condition, history.doctor_advice, history.date_scan, history.created_at, history.updated_at FROM history JOIN patient ON history.patient_id = patient.id JOIN doctor ON history.doctor_id = doctor.id JOIN user AS user_doc ON user_doc.id = doctor.user_id JOIN user AS user_pat ON user_pat.id = patient.user_id;", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                return result.status(400).send({ error: err, data: null, message: "Error getting data" });
            }

            if (res.length) {
                console.log("found history: ", res);
                return result.status(200).send({ exist: true, data: res, message: 'List all history' });
            } else {
                return result.status(200).send({ exist: false, data: null, message: "No data" });
            }

        })
    } catch (error) {
        next(error);
    }
};

History.getHistoryByPatientID = async (request, result, next) => {
    try {
        await sql.query("SELECT history.id, user_pat.name AS patient_name, user_doc.name AS doctor_name, history.patient_condition, history.doctor_advice, history.date_scan, history.created_at, history.updated_at FROM history JOIN patient ON history.patient_id = patient.id JOIN doctor ON history.doctor_id = doctor.id JOIN user AS user_doc ON user_doc.id = doctor.user_id JOIN user AS user_pat ON user_pat.id = patient.user_id WHERE history.patient_id = ?;",
            [request.body.patientID], (err, res) => {
                if (err) {
                    console.log("Error: ", err);
                    return result.status(400).send({ error: err, data: null, message: "Error getting data" });
                }

                if (res.length) {
                    console.log("found history: ", res);
                    return result.status(200).send({ exist: true, data: res, message: 'History by patient ID' });
                } else {
                    return result.status(200).send({ exist: false, data: null, message: "No data" });
                }

            })
    } catch (error) {
        next(error);
    }
};

History.getHistoryByDoctorID = async (request, result, next) => {
    try {
        await sql.query("SELECT history.id, user_pat.name AS patient_name, user_doc.name AS doctor_name, patient.tingkat_stress, history.patient_condition, history.doctor_advice, history.date_scan, history.created_at, history.updated_at FROM history JOIN patient ON history.patient_id = patient.id JOIN doctor ON history.doctor_id = doctor.id JOIN user AS user_doc ON user_doc.id = doctor.user_id JOIN user AS user_pat ON user_pat.id = patient.user_id WHERE history.doctor_id = ?;",
            [request.body.doctorID], (err, res) => {
                if (err) {
                    console.log("Error: ", err);
                    return result.status(400).send({ error: err, data: null, message: "Error getting data" });
                }

                if (res.length) {
                    console.log("found history: ", res);
                    return result.status(200).send({ exist: true, data: res, message: 'History by doctor ID' });
                } else {
                    return result.status(200).send({ exist: false, data: null, message: "No data" });
                }

            })
    } catch (error) {
        next(error);
    }
};

module.exports = History;