//const express = require('express');
//const router = express.Router();

const { Router } = require('express');
const router = Router();

const Task = require('../models/Task');


router.get('/', async (req, res) => {

    const task = await Task.find();
    console.log(task);
    res.json(task);
});

router.post('/', async (req, res) => {

    const t = new Task(req.body);
    console.log(t);

    await t.save();
    res.json({
        Status: 'Task saved'
    }); 
});

router.get('/:id', async (req, res) => {

    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.put('/:id', async (req, res) => {

    await Task.findByIdAndUpdate(req.params.id, req.body);
    console.log(req.params);
    //await t.save();
    res.json({
        Status: 'Task updated'
    }); 
});

router.delete('/:id', async (req, res) => {

    await Task.findByIdAndDelete(req.params.id);
    console.log(req.params);
    //await t.save();
    res.json({
        Status: 'Task deleted'
    }); 
});

module.exports = router;