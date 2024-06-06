const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Route pour la page d'accueil
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});
app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil de votre application.');
});

// Route pour gérer les paiements
app.post('/api/payment', async (req, res) => {
  try {
    console.log('Requête POST reçue :', req.body);
    const { paymentMethodId } = req.body;

    // Créer un paiement avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, 
      currency: 'usd',
      payment_method: paymentMetho