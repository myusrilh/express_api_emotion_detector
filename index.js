const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const doctor = require('./routes/doctor.routes.js');
const patient = require('./routes/patient.routes.js');
const history = require('./routes/history.routes.js');
const user = require('./routes/user.routes.js');


var corsOptions = {
    origin: `http://localhost:${port}`,
    optionSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(express.urlencoded({
    extended: true
}));

app.use('/api/doctor', doctor);
app.use('/api/patient', patient);
app.use('/api/history', history);
app.use('/api/user', user);

app.use('*', function (req, res) {
    console.log('Wrong routes!');
    return res.status(404).send("<h1> Wrong Routes! Insert another URL </h1>");
});

app.listen(port, () => {
    console.log(`Karyawan app listening at http://localhost:${port}`);
});

