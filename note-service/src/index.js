const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const config = require("./app/config/config");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(config.path('public')));

// simple route
app.get("/", function (request, response) {
    response.sendFile(config.ROOT_PATH + 'index.html');
});

require("./app/routes/category-routes")(app);
require("./app/routes/note-routes")(app);

// set port, listen for requests
app.listen(config.APP.PORT, function () {
    console.log(`Server is running on port ${config.APP.PORT}.`);
});
