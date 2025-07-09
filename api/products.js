import Product from "../app/models/Products.js";
import { connectDB } from '../db.js';

export default async function handler(req, res) {
  await connectDB();
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
}