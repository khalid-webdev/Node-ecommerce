const mongoose = require('mongoose')
const express = require("express");
const app = express();

mongoose.connect('mongodb://localhost:27017/user-db').then(() => console.log('MongoDb connected successfully.....')).catch((err) => console.log('Database Connection Failed!!!', err))

app.get("/", (req, res) => {
res.send("hello world");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is listening on localhost:${PORT}......`))
