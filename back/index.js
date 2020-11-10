const express = require("express");
const logger = require("morgan");
const chalk = require("chalk");
//const dotenv = require("dotenv");
const cors=require("cors");
const Router = require("./route/Router");
const bodyParser = require("body-parser");
var app = express();

/*----------------DB connection starts----------------*/
//connecting with the database
//admin.initializeApp({
  //  credential: admin.credential.cert(serviceAccount),
   // databaseURL: "https://sckiply.firebaseio.com/"
 // })

/*----------------DB connection ends----------------*/

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/",Router)

app.use((error, req, res, next) => {
    res.error({ code: error.status || 500, message: error.message, errors: error.errors });
})
  
app.use((req, res, next) => {
    res.status(404).send('Not Found')
})
  
  
app.listen(PORT, () => {
    console.log(chalk.yellow("server started at PORT ") + chalk.green(PORT));
});