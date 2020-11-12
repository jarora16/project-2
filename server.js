// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const path = require("path");
require("dotenv").config();

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
// var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Joins the public folder to link files
app.use(express.static(path.join(__dirname, "public")));


// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);
const orderRoutes = require("./routes/orders");
app.use("/api/orders", orderRoutes);


// Syncing our sequelize models and then starting our Express app
// =============================================================
// db.sequelize.sync({ force: true }).then(function () {
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("App listening on PORT " + PORT);
});
// });

