const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
var Auth = require('./controllers/Auth.js');
const bcrypt = require('bcrypt')
const bearerToken = require('express-bearer-token');
const app = express()
const User = require('./models/User.js');
const ObjetController = require('./controllers/ObjetController.js')
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
app.post('/api/auth/signup', (req, res) => {
  Auth.signup(req, res);
})
app.post('/api/objet/add', (req, res) => {
  console.log("Here")
  Auth.doIfConnected(req, res, ObjetController.ajouterObjet)
})
app.put('/api/objet/edit', (req, res) => {
  Auth.doIfConnected(req, res, ObjetController.modifierObjet)
}) 
app.delete('/api/objet/:id/delete', (req, res) => {
  Auth.doIfConnected(req, res, ObjetController.supprimerObjet)
})
app.get('/api/objet/list', (req, res) => {
  Auth.doIfConnected(req, res, ObjetController.listeObjet)
}) 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})