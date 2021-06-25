var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
var User = require('../models/User')
const { Validator } = require('node-input-validator');

function hashPassword(password){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
          if (err) reject(err)
          resolve(hash)
        });
    })
}
module.exports = {
    doIfConnected : function(req, res, next){
        jwt.verify(req.token, 'seeeeeeeeeeeeeeecret', function(err, decoded) {
            next(req, res, decoded);
        });
    },
    printConnectedUser: function (req, res, user){
        console.log("User ", user)
        res.json({user: user.data.user})
    },
    login : async function(req, res){
        const v = new Validator(req.body.form, {
            email: 'required|email',
            password: 'required|minLength:6'
        });
        const matched = await v.check();
        if(matched){
            let password = req.body.form.password
            let email = req.body.form.email
            let user = await User.findOne({email: email})
            if(user){
                let compare = await bcrypt.compare(password, user.password);
                if(compare){
                    user.password = ""
                    delete user['password']
                    var token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), data: {user}}, 'seeeeeeeeeeeeeeecret');
                    res.json({token})
                    console.log("Login success ",email, " ", password)
                }
                else{
                    res.json({error: "Mot de passe incorrect"})
                }
            }
            else res.json({error: "Adresse email incorrecte"})
        }
        else{
            console.log(v.errors)
            res.json({error: "Une erreure s'est produite"})
        }

        

          
    },
    signup: async function(req, res){
        const v = new Validator(req.body.form, {
            email: 'required|email',
            password: 'required|minLength:6',
            nom: 'required|minLength:3'
        });
        const matched = await v.check();
        console.log('register ',matched)
        if(matched ){
            let nom = req.body.form.nom.trim()
            let password = req.body.form.password
            let email = req.body.form.email

            const emailExist = await User.findOne({email: email})
            if(! emailExist){
                let user = new User()
                user.nom = nom
                user.email = email
                user.password = await hashPassword(password)
                user.save()
                console.log("New User ",user)
                res.json({success:true})
            }
            else{
                res.json({error: 'Cette adresse email est déjà utilisée'})
            }
            
        }
        else{
            console.log(v.errors)
            res.json({error: "Une erreure s'est produite"})
        }
    }
};