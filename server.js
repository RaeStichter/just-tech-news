const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
// Added in 14
const path = require('path');
const exphbs = require('express-handlebars');

const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });


const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// end added in 14

const app = express();
const PORT = process.env.PORT || 3001;

// added in 14
// set up for the session infromation
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave:false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
// end added in 14

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); //14.1
// Added in 14
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
// end added in 14

// turn on routes
app.use(routes);

// turn on connection to database and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});