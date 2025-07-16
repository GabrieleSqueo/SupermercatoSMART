import React from 'react'
import Order from "../app/models/Order.js"
import { connectDB } from '../db.js';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import RefreshToken from "../app/models/refreshTokenModel.js"
dotenv.config();

export default async function handler(req, res) {
  await connectDB();
  try {
    
    const {prodotti, costoTotale, utente} = req.body;
    
    if (!prodotti || !costoTotale) {
      return res.status(400).json({message: "Mancano i prodotti"});
    }
    if (!Array.isArray(prodotti) || prodotti.length === 0) {
      return res.status(400).json({message: "Il carrello è vuoto"});
    }

    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: "Token mancante" });
    }
    const token = authorization.split(' ')[1];
    let userId;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (decoded) {
        userId = decoded.userId;
        const newProdotti = JSON.stringify(prodotti.map(({nome, quantità}) => ({nome, quantità})))
    
      console.log("Creo il nuovo ordine")
      const orderToCreate = new Order({
        prodottiComprati: newProdotti,
        costo: Number(costoTotale),
        userId: userId
      });
      orderToCreate.save();
      res.status(200).json({message: "Ordine aggiunto con successo" });
      }
      if (err && err.name === 'TokenExpiredError') {
      const {refreshToken} = req.body;
      console.log(refreshToken)
      if (!refreshToken) return res.status(403).json({ message: "Refresh token mancante" });

      const tokenDoc = RefreshToken.findOne({ token: refreshToken });
      if (!tokenDoc) return res.status(403).json({ message: "Refresh token non valido" });
      try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign({ userId: payload.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        return res.status(401).json({ message: "Access token scaduto", accessToken: newAccessToken });
      } catch (refreshErr) {
        return res.status(403).json({ message: "Refresh token scaduto o non valido" });
      }
    } else if (err) {
      return res.status(403).json({ message: "Token non valido" });
    }
    });
    
  } catch (error) {
    console.error("Errore nel middleware di creazione ordini:", error);
    res.status(500).json({message: "Errore del server"});
  }
}