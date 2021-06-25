const mongoose = require('mongoose')

const { Schema } = mongoose;

const objetSchema = new Schema({
    nom:  String,
});
const Objet = mongoose.model('Objet', objetSchema);
module.exports = Objet;  