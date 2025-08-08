require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT
const { dbConnection } = require('./config/config');
const Taskroutes = require('./routes/tasks.js');

app.use(express.json());
app.get('/', (req, res) =>{
    res.status(201).send('Agregar /tasks en el local host para traer resultados de MongoDb');
})
app.use("/tasks", Taskroutes);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port: http://localhost:${PORT}`));