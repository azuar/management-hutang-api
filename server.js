const express = require('express')
const cors = require('cors');
const env = require('dotenv');
const bodyParser = require('body-parser');
const usersController = require('./controller/users');
const hutangController = require('./controller/hutang');
// const YAML = require('yamljs');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = YAML.load('./swagger/auth.yaml');
const app = express();
const port = env.PORT || 3000;

app
    .use(cors())
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: true }))
    .use('/api', usersController, hutangController)
    // .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .listen(port, () => {
        console.log(`Listen to http://localhost:${port}`)
    })

app
    .get('/', (req, res) => {
        res.json('Active')
    })