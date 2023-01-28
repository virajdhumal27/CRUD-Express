const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

const path = require('path');

router.get('/', (req, res) => {
    console.log('A USER JOINED!');
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/getStudent/:id', async(req, res)=> {
    try {
        const student = await Student.findById(req.params.id);
        res.json(student);
    } catch (err) {
        res.send('Error: ' + err);
    }
})

router.get('/getStudents', async(req,res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch(err) {
        res.send('Error: ' + err);
    }
});

router.post('/addStudent', async(req,res)=> {
    const student = new Student({
        name: req.body.name,
        department: req.body.department
    });

    try {
        await student.save();
        console.log(req.body);
        res.json({
            status: 200,
            message: 'Data saved!'
        });
    } catch (err) {
        res.json({
            status: 401,
            message: 'BAD REQUEST ' + err
        });
    }
    
});

router.patch('/updateStudent', async(req, res) => {
    console.log(req.body);
    const student = await Student.findById(req.body.id);

    try {
        
        if (student === null) {
            res.json({
                status: 200,
                message: `No Student of id: ${req.body.id} found!`
            });
            
        } else {
            
            student.name = req.body.name;
            student.department = req.body.department;
            await student.save();
            res.json({
                status: 200,
                message: `Student of id: ${req.body.in} is updated!`
            });
        }
    } catch (err) {
        res.json({
            status: 401,
            message: `Student of id: ${req.body.in} is BAD REQUEST! ${err}`
        });
    }
});

module.exports = router;