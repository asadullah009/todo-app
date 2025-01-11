
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db/mongodb");
const {notFoundHandler} = require("./middleware/validator")
const path = require("path");

// Load environment variables
dotenv.config();

const allRoutes = require("./routes/routes");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));


const server = app.listen(process.env.PORT, () => {
    console.log(`*********************************************`);
    console.log('***********                        **********');
    console.log(`*********** Running On Port: ${process.env.PORT} ***********`);
    console.log('***********                        **********');
    console.log(`*********************************************`);

});

// Routes
app.use("/api", allRoutes);
app.use(notFoundHandler);


module.exports = app;
