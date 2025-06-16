import express from 'express';
import Product from '../models/Products.js';
import productMiddleware from "../api/products.js"

const router = express.Router();

router.get('/products',productMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Non ci sono prodotti" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Errore nel recupero dei prodotti:", error);
    return res.status(500).json({ message: "Errore del server" });
  }
});

export default router; 