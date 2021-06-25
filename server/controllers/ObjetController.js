var Objet = require('../models/Objet')
const { Validator } = require('node-input-validator');


module.exports = {
    ajouterObjet: async function(req, res, user){
        const v = new Validator(req.body.objet, {
            nom: 'required|minLength:3',
        });
        const matched = await v.check();
        if(matched){
            let objet = new Objet()
            objet.nom = req.body.objet.nom.trim()
            objet.save()
            res.json({objet})
        }
        else{
            res.json({error: "Une erreure s'est produite"})
        }
        
    },
    modifierObjet: async function(req, res, user){
        const v = new Validator(req.body.objet, {
            _id: 'required',
            nom: 'required|minLength:3',
        });
        const matched = await v.check();
        if(matched){
            const objet = await Objet.findById(req.body.objet._id);
            objet.nom = req.body.objet.nom.trim()
            objet.save()
            res.json({objet})
        }
        else{
            console.log(v.errors)
            console.log(req.body.objet)
            res.json({error: "Une erreure s'est produite"})
        }
        
    },
    supprimerObjet: async function(req, res, user){
        const v = new Validator(req.body.objet, {
            _id: 'required',
        });
        const matched = await v.check();
        if(matched){
            Objet.findById(req.body.objet._id).remove().exec();
            res.json({success:true})
        }
        else{
            res.json({error: "Une erreure s'est produite"})
        }
        
    },
    listeObjet: async function(req, res, user){
        let objets = await Objet.find()
        res.json({objets})
    }
};