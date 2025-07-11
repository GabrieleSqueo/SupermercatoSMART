import jwt from 'jsonwebtoken';
import Order from '../app/models/Order.js'; // Added import for Order model
import { connectDB } from '../db.js';

export default async function handler(req, res) {
  await connectDB();
  try {
    // Verifica il token JWT dall'header Authorization
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.ACCESS_TOKEN_SECRET).userId;
    if (!userId) {
      return res.status(401).json({ message: "Token non valido" });
    }
    

    const orders = await Order.find({ userId }).sort({ _id: -1 });
    const formattedOrders = orders.map(order => ({
      id: order._id,
      prodottiComprati: order.prodottiComprati,
      costo: order.costo,
      data: order._id.getTimestamp(),
      userId: order.userId
    }));
    res.status(200).json({ success: true, orders: formattedOrders });
  } catch (error) {
    console.error("Errore nel recupero ordini:", error);
    res.status(401).json({ message: "Token non valido o errore del server" });
  }
}