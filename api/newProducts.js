import Product from '../app/models/Products.js';
import { connectDB } from '../app/utils/db.js';

export default async function handler(req, res) {
  await connectDB();
  try {
    const { name, prezzo, descrizione, foto } = req.body;
    if (!name || !prezzo || !descrizione || !foto) {
      return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
    }
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Prodotto già esistente" });
    }
    const product = new Product({
      nome: name,
      prezzo: Number(prezzo),
      descrizione,
      foto
    });
    await product.save();
    res.status(200).json({ message: "Prodotto creato con successo" });
  } catch (error) {
    console.error("Errore nella creazione prodotto:", error);
    res.status(500).json({ message: "Errore del server" });
  }
} 