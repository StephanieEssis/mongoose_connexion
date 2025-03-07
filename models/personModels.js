const mongoose = require('mongoose');

// Schéma pour une personne
const personSchema = new mongoose.Schema({
name: { type: String, required: true },
age: Number,
favoriteFoods: [String]
});

// Création du modèle Person
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
