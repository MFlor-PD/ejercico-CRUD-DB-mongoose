const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js"); 

router.post("/create", async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
});

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the tasks" });
    }
}
);

router.get("/id/:_id", async (req, res) => {   //no funciona
    try {
        const task = await Task.findById(req.params._id);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the task" });
    }
});

router.put("/markAsCompleted/:_id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { completed: true },
            { new: true }
        );
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to update the task" });
    }
});

router.put("/id/:_id", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).send({ message: "Please provide a title to update." });
        }
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { title: title },
            { new: true },
        ); 
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to update the task." });
    }
}); 

router.delete("/id/:_id", async (req, res) => { 
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to delete the task" });
    }   
})
    
module.exports = router;