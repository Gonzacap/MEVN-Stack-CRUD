//express cofiguration

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const path =require('path');

const app = express();

//mongoose.connect('mongodb://localhost/mevn-database')
mongoose.connect('mongodb://localhost/mevn-database', { useNewUrlParser: true, useUnifiedTopology: true  })

    .then((db) => console.log('DB is connected'))
    .catch((e) => console.error(e));


//Settings

app.set('PORT', process.env.PORT || 3000);
//app.set('vew engine', 'ejs');
//app.set('views',path.join(__dirname, '../app/views'));


//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes

app.use('/api/task', require('./routes/task'));


//Static Files

app.use(express.static(__dirname + '/public'));

//Server Listening

app.listen(app.get('PORT'), () => {

    console.log('Server on Port '+app.get('PORT'));
});

