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

    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({message: "Token mancante"});
    }
    const token = authorization.split(' ')[1];
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const refreshToken =  req.headers.refreshtoken;
        console.log("server "+ refreshToken)
        if (!refreshToken) return res.status(403).json({ message: "Refresh token mancante" });

        // Verifica che esista nel DB
        const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
        if (!tokenDoc) return res.status(403).json({ message: "Refresh token non valido" });

          const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
          // Genera nuovo access token
          const newAccessToken = jwt.sign({ userId: payload.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
          // Puoi restituire il nuovo access token e chiedere al client di riprovare la richiesta
          return res.status(401).json({ message: "Access token scaduto", accessToken: newAccessToken });
      } else {
          return res.sendStatus(403);
      }
        
    } 

    const newProdotti = JSON.stringify(prodotti.map(({nome, quantità}) => ({nome, quantità})))
    console.log(newProdotti)
    console.log("utente" + utente)
    console.log("Creo il nuovo ordine")
    const orderToCreate = new Order({
      prodottiComprati: newProdotti,
      costo: Number(costoTotale),
      userId: utente
    });
    await orderToCreate.save();
    res.status(200).json({message: "Ordine aggiunto con successo" });
  } catch (error) {
    console.error("Errore nel middleware di creazione ordini:", error);
    res.status(500).json({message: "Errore del server"});
  }
}