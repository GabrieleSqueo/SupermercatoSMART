import Product from '../app/models/Products.js';
import { connectDB } from '../app/utils/db.js';

export default async function handler(req, res) {
  await connectDB();
  try {
    const prodotti = await Product.find();
    res.status(200).json(prodotti);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero prodotti' });
  }
} 