import jwt from 'jsonwebtoken';
import Order from '../app/models/Order.js'; // Added import for Order model

const retrieveOrders = async (req, res) => {
  try {
    // Verifica il token JWT dall'header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token mancante' });
    }

    const token = authHeader.substring(7); // Rimuove "Bearer "
    
    // Verifica il token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;

    // Aggiungi l'userId alla richiesta per il middleware successivo
    req.userId = userId;
    
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

export default retrieveOrders;