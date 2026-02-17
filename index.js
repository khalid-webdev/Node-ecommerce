require("dotenv").config({quiet:true})
const mongoose = require('mongoose')
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

mongoose.connect('mongodb://localhost:27017/user-db').then(() => console.log('MongoDb connected successfully.....')).catch((err) => console.log('Database Connection Failed!!!', err))

app.use(express.json());
app.use("/api/user", userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is listening on localhost:${PORT}......`))
