import jwt from 'jsonwebtoken';
import Order from '../app/models/Order.js';
import { connectDB } from '../db.js';
import RefreshToken from '../app/models/refreshTokenModel.js';

export default async function handler(req, res) {
  await connectDB();
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: "Token mancante" });
    }
    const token = authorization.split(' ')[1];
    let userId;
    try {
      userId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).userId;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // Prendi il refresh token da header o body
        const refreshToken = req.headers.refreshtoken || req.body?.refreshToken;
        if (!refreshToken) return res.status(403).json({ message: "Refresh token mancante" });
        const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
        if (!tokenDoc) return res.status(403).json({ message: "Refresh token non valido" });
        try {
          const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
          const newAccessToken = jwt.sign({ userId: payload.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
          return res.status(401).json({ message: "Access token scaduto", accessToken: newAccessToken });
        } catch (refreshErr) {
          return res.status(403).json({ message: "Refresh token scaduto o non valido" });
        }
      } else {
        return res.status(403).json({ message: "Token non valido" });
      }
    }

    // Recupera gli ordini
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