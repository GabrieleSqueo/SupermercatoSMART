import jwt from 'jsonwebtoken';
import Order from '../app/models/Order.js';
import { connectDB } from '../app/utils/db.js';

export default async function handler(req, res) {
  await connectDB();
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token mancante' });
    }
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;
    const orders = await Order.find({ userId });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Errore nel recupero ordini:", error);
    res.status(401).json({ message: "Token non valido o errore del server" });
  }
} 