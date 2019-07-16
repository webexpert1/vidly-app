const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const app = express();

const genres = require('./routes/genres');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/', home);


// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled');
}



// Port
const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Listening on port ${port}`));