const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const initMongo= require('./config/db')
const authRoutes= require('./routes/authRoutes');


//initiate mongo server to establish connection
initMongo();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRoutes)



app.get("/", (req, res) => {
    res.json({message:'Hi there! api working'});

});

app.listen(PORT, (req,res) => {
    console.log(`Server listening on port ${PORT}`);
});