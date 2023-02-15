require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cron = require('node-cron');
const errorHandler = require('_middleware/error-handler');

require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.get('/sms',(req,res)=>{
    res.send("<h1>hello</h1>")
})
// swagger docs route

// api routes
app.use(require('./src/routes/userRoute'));
app.use(require('./src/routes/roleRoute'));
app.use(require('./src/routes/loginRoute'));
//app.use('/api-docs', require('_helpers/swagger'));

// start server
//const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4800;
const port = process.env.PORT;
app.listen(port, () => console.log('Server listening on port ' + port));
