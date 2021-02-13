const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
// Added in 14
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
// end added in 14

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); //14.1
// Added in 14
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// end added in 14

// turn on routes
app.use(routes);

// turn on connection to database and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});