const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');
const Taskroutes = require('./routes/tasks.js');

app.use(express.json());
app.use("/tasks", Taskroutes);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));