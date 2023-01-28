const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DB_URL = 'mongodb://localhost/students'
const app = express();

const PORT = 3000;

mongoose.connect(DB_URL);
const con = mongoose.connection;

con.on('open', () => {
    try {
        console.log('DB connected...');
    } catch(err) {
        console.log('Cannot connect DB');
    }
});

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

app.use(express.json());

const studentsRouter = require('./routes/students');
app.use('/', studentsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});