const config = require('config');
const sDebug = require('debug')('app:stratup');
const dDebug = require('debug')('app:db');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const routeCourses = require('./routes/courses');
const routeHome = require('./routes/home');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

app.use(logger);
app.use(auth);
app.use(helmet());
app.use('/', routeHome);
app.use('/api/courses', routeCourses);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    sDebug('morgan enabled');
}

dDebug('database debugger');
//to call in cmd: set DEBUG=app:startup for single
//to call in cmd: set DEBUG=app:startup,app:db for multiple
//to call in cmd: set DEBUG=app:* for all

console.log(`name: ${config.get('name')}`)
console.log(`server: ${config.get('mail.host')}`)
console.log(`pass: ${config.get('mail.password')}`)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));