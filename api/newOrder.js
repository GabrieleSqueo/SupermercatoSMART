import React from 'react'
import Order from "../app/models/Order.js"
import { connectDB } from '../db.js';
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
  await connectDB();
  try {
    
    const {prodotti, costoTotale, utente} = req.body;
    
    if (!prodotti || !costoTotale) {
      return res.status(400).json({message: "Mancano i prodotti"});
    }

    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({message: "Token mancante"});
    }
    const token = authorization.split(' ')[1];
    jwt.verify(token, PROCESS.ENV.ACCESS_TOKEN_SECRET, (err)=> {
      if (err) return json.sendStatus(403)
    })

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