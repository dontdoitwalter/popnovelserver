require('dotenv').config();
let express = require('express');
let app = express();
let test = require('./controllers/testcontrollers');
let sequelize = require('./db');
let bodyParser = require('body-parser');
let user = require('./controllers/usercontroller');
let suggest = require('./controllers/suggestcontroller')
let story = require('./controllers/storycontroller');
/*MAKING SURE ITS WORKING*/
sequelize.sync();
app.use(require('./middleware/headers'));
app.use(bodyParser.json());
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})
/*TEST ROUTES*/
app.use('/api/test', function(req, res){
    res.send("This is data from the /api/test endpoint. It's from the server.")
})
app.use('/test', test)
/*EXPOSED ROUTES*/
app.use('/user', user)
app.use('/user', user)
/*VALIDATE SESSION*/
app.use(require('./middleware/validatesession'))
/*AUTHORIZED ROUTES*/
app.use('/authuser', suggest)
app.use('/authuser', story)