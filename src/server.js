'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes.routes);

app.listen(config.port, ()=> console.log(`Server started on http://localhost:${config.port}`));