const express = require('express');
const app = express()
const path = require('path');
const Router = require('./routes/route');

app.set('views', path.join(__dirname,'./views'))
app.set('view engine','ejs');

// SET CSS FILES
app.use('/static', express.static(path.join(__dirname, 'static')))

//FOR req.body
app.use(express.urlencoded({ extended : true }))
app.use('/', Router)

// CHECK CONNECTION
app.listen(3000, () => {console.log('this app running on port : 3000')});
