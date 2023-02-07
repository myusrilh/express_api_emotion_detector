const sql = require('../config/db.js');

// constructor
const History = (history) => {
    this.id = history.id;
    this.user_id = history.user_id;
    this.spesialisasi = history.spesialisasi;
    this.status = history.status;
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
                return result.status(200).send({ error: false, data: res, message: 'List all history' });
            }

        })
    } catch (error) {
        next(error);
    }
};

module.exports = History;