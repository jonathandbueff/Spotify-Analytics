// server/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.SERVER_PORT;
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

/**
 * https://expressjs.com/en/guide/routing.html
 * used to create modular routes
 *
 * convention is to have the http path be the same as the relative path to the file
 * from within the routed directory
 * (e.g. "/" is "routes/index.js" and "/api/audioFeatures" is "routes/api/audioFeatures.js")
 */
app.use('/', routes);

let my_redirect_uri = 'localhost:3000/home';

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
