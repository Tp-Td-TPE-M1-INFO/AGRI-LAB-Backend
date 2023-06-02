require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

require('./config/db');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname +'/public'));

app.use('/api', require('./routes/farmer.routes'));
app.use('/api', require('./routes/investor.routes'));
app.use('/api', require('./routes/project.routes'));

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`listen on port ${port}`);
})