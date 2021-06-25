const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
var Auth = require('./controllers/Auth.js');
const bcrypt = require('bcrypt')
const bearerToken = require('express-bearer-token');
const app = express()
const User = require('./models/User.js');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

var urlmongo = "mongodb://localhost/troov";
mongoose.connect(urlmongo, {useNewUrlParser: true, useUnifiedTopology: true});




const port = 3001

app.use(bearerToken());
 

app.get('/', (req, res) => {
  res.json({t: "Hello"})
})
app.post('/api/auth/login', (req, res) => {
  Auth.login(req, res);
})
app.get('/api/auth/user', (req, res) => {
  Auth.doIfConnected(req, res, Auth.printConnectedUser)
})
app.post('/api/auth/logout', (req, res) => {
  res.json({logout: true})
})  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})