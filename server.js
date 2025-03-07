const mongoose = require('mongoose');
require('dotenv').config(); // Charger les variables d'environnement

// Importation du modèle Person
const Person = require('./models/personModels'); // Assurez-vous que ce chemin est correct

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connexion à MongoDB réussie!");

    // Création d'une nouvelle personne
    const newPerson1 = new Person({
      name: "John Doe",  // Nom de la personne (obligatoire)
      age: 30,           // Âge de la personne
      favoriteFoods: ["quiche", "jus de citron", "hamburger"]  // Liste des aliments favoris
    });

    // Sauvegarde de la première personne dans la base de données
    newPerson1.save()
      .then(() => {
        console.log("Personne ajoutée avec succès !");
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout de la personne :", err);
      });

    // Création d'une nouvelle instance de Person avec les champs correspondants
    const newPerson2 = new Person({
      name: "Jane Doe",  // Nom de la personne
      age: 28,           // Âge de la personne
      favoriteFoods: ["Pasta", "Soupe", "Ice Cream"]  // Liste des aliments favoris
    });

    // Sauvegarde de la deuxième personne dans la base de données avec un callback
    newPerson2.save()
      .then((data) => {
        console.log("Personne ajoutée avec succès :", data);
      })
      .catch((err) => {
        console.error("Erreur lors de la sauvegarde de la personne :", err);
      });

    // Création d'un tableau de personnes à ajouter
    const people = [
      {
        name: "Jenifer",
        age: 25,
        favoriteFoods: ["Pizza", "milshake", "donut"]
      },
      {
        name: "Alain",
        age: 30,
        favoriteFoods: ["Pasta", "Sushi"]
      },
      {
        name: "Chantal",
        age: 35,
        favoriteFoods: ["Saumon", "goyave", "Tarte aux pommes"]
      }
    ];

    // Utilisation de Model.create() pour enregistrer plusieurs personnes en une seule fois
    Person.create(people)
      .then((data) => {
        console.log("Personnes ajoutées avec succès :", data);
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout des personnes :", err);
      });
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB :", err);
  });

// Recherche des personnes par nom
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name });
    console.log('People found:', people);
  } catch (err) {
    console.error("Erreur lors de la recherche de personnes par nom :", err);
  }
};

// Trouver une personne par aliment préféré
const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log('Person found:', person);
  } catch (err) {
    console.error("Erreur lors de la recherche de personne par aliment :", err);
  }
};

// Trouver une personne par ID
const findPersonById = async (id) => {
  try {
    const person = await Person.findById(id);  // Utilisation de await, plus besoin de callback
    console.log('Person by ID:', person);
  } catch (err) {
    console.error("Erreur lors de la recherche de personne par ID :", err);
  }
};

// Trouver, éditer et sauvegarder
const updateFavoriteFood = async (id) => {
  try {
    const person = await Person.findById(id);
    person.favoriteFoods.push('Hamburger');
    await person.save();
    console.log('Updated person:', person);
  } catch (err) {
    console.error('Erreur lors de la mise à jour des aliments favoris :', err);
  }
};

// Trouver et mettre à jour
const updateAgeByName = async (name) => {
  try {
    const person = await Person.findOneAndUpdate(
      { name },
      { age: 20 },
      { new: true }
    );
    console.log('Age updated:', person);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'âge par nom :", err);
  }
};

// Supprimer une personne par ID
const deletePersonById = async (id) => {
  try {
    const person = await Person.findByIdAndRemove(id);
    console.log('Person deleted:', person);
  } catch (err) {
    console.error('Erreur lors de la suppression de la personne par ID :', err);
  }
};

// Supprimer plusieurs personnes
const removePeopleByName = async (name) => {
  try {
    const result = await Person.deleteMany({ name });
    console.log('People removed:', result);
  } catch (err) {
    console.error('Erreur lors de la suppression des personnes par nom :', err);
  }
};

// Recherche et filtrage en chaîne
const searchAndFilter = async () => {
  try {
    const people = await Person.find({ favoriteFoods: 'Burritos' })
      .sort({ name: 1 })
      .limit(2)
      .select('-age')
      .exec();
    console.log('Filtered People:', people);
  } catch (err) {
    console.error('Erreur lors de la recherche et du filtrage des personnes :', err);
  }
};

// Trouver une personne par _id
const findPersonByIdAsync = async (id) => {
  try {
    const person = await Person.findById(id);  // Utilisation de await
    console.log('Person by ID:', person);
  } catch (err) {
    console.error("Erreur lors de la recherche de personne par ID :", err);
  }
};

// Appel de la fonction
findPersonByIdAsync();
