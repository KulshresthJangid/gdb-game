require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const { mongoIntl, getSqlInstance, checkConection } = require('./utils/dbs');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(port, async () => {
    try {
        console.warn("Server is up and running on port:", port);
        await mongoIntl();
        await checkConection();

    } catch (error) {
        console.error('Error while starting the server', error);
    }
});
