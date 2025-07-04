require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');
const Taskroutes = require('./routes/tasks.js');

app.use(express.json());
app.use("/tasks", Taskroutes);

//console.log("MONGO_URI desde index.js:", process.env.MONGO_URI); // <-- Añade esta línea
dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));