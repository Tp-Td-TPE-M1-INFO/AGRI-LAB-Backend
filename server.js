require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require('./config/db');
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(__dirname +'/public'));

app.get('/', (req, res)=>{
    res.send("api is running");
})

app.use('/api/farmer', require('./routes/farmer.routes'));
app.use('/api/investor', require('./routes/investor.routes'));
app.use('/api/project', require('./routes/project.routes'));
app.use('/api/document', require('./routes/document.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use('/api/investment', require('./routes/investment.routes'));

//swagger
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Agri-Lab Express API with Swagger",
        version: "0.1.0",
        description:
          "Agri-Lab implementation API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://agrilab-7qta.onrender.com",
          email: "tchindec111@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:4000/api",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

const specs = swaggerJsDoc(options)
app.use( "/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`listen on port ${port}`);
})