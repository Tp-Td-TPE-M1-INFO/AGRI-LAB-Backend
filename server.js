require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

require('./config/db');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname +'/public'));

app.get('/', (req, res)=>{
    res.send("api is running")
})

app.use('/api/farmer', require('./routes/farmer.routes'));
app.use('/api/investor', require('./routes/investor.routes'));
app.use('/api/project', require('./routes/project.routes'));
app.use('/api', require('./routes/auth.routes'));

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`listen on port ${port}`);
})