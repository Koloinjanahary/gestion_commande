// Import des dépendances
const express = require('express');
const bodyParser = require('body-parser');
const commandeRoutes = require('./Routes/CommandeRoutes');
const platRoutes = require('./Routes/PlatRoutes');
const tableRoutes = require('./Routes/TableRoutes');
const testRoutes = require('./Routes/TestRoutes');
const recetteRoutes = require('./Routes/RecetteRoutes');
const journalRoutes = require('./Routes/JournalRoutes')
const sequelize = require('./config/config');
const cors =require('cors');


/*const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
     allowedHeaders: ['Content-Type', 'Authorization']
};*/

// Création de l'application Express
const app = express();

app.use(cors( )); 
// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Définition des routes
app.use('/api', commandeRoutes);
app.use('/api', platRoutes);
app.use('/api', tableRoutes);
app.use('/api', journalRoutes);
app.use('/api', recetteRoutes);
app.use('/api', testRoutes);


// Synchronisation de la base de données
sequelize.authenticate({ force: false }).then(() => {
  console.log('Base de données synchronisée');
}).catch(err => {
  console.error('Erreur de synchronisation de la base de données:', err);
});

sequelize.sync({ force: false }).then(() => {
  console.log('Base de données synchronisée');
}).catch(err => {
  console.error('Erreur de synchronisation de la base de données:', err);
});

// Port d'écoute
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

