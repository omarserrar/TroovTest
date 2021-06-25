var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
var User = require('../models/User')

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
        
        let password = req.body.form.password
        let email = req.body.form.email

        if(password && email){
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
            res.json({error: "Une erreure s'est produite"})
        }

        

          
    },
    register: function(req, res){
        let user = new User()
        user.nom = "Omar"
        user.email = "omarserrar2@gmail.com"
        bcrypt.hash("123456", 10, (err, hash) => {
        user.password = hash
        user.save()
        console.log("User Insert ",user)
        });
    }
};