const { urlencoded, json } = require('express');
const express = require('express');
const connect = require('./config/database');
const app = express();
const todoRoute = require('./routes/routes');

connect();

//middleware
app.use(json());
app.use('/', todoRoute);
app.use(urlencoded({extended: true}));
// app.use(express.static("public"));
// app.set("view engines", "ejs");














const PORT = 2100;

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})