import Order from '../app/models/Order.js';
import { connectDB } from '../app/utils/db.js';

export default async function handler(req, res) {
  await connectDB();
  try {
    const { prodotti, costoTotale, utente } = req.body;
    if (!prodotti || !costoTotale) {
      return res.status(400).json({ message: "Mancano i prodotti" });
    }
    const newProdotti = JSON.stringify(prodotti.map(({ nome, quantità }) => ({ nome, quantità })));
    const order = new Order({
      prodottiComprati: newProdotti,
      costo: Number(costoTotale),
      userId: utente
    });
    await order.save();
    res.status(200).json({ message: "Ordine creato con successo" });
  } catch (error) {
    console.error("Errore nella creazione ordine:", error);
    res.status(500).json({ message: "Errore del server" });
  }
} 