const express = require('express');
const app = express();


// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json());



// routes
app.use(require('./routes/routes'));

// starting the server
app.listen(app.get('port'), ()=> {
    console.log(`server on port ${app.get('port')}`);
})
