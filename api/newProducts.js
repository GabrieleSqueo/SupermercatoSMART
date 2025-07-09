import React from 'react'
import Product from "../app/models/Products.js";
import { connectDB } from '../db.js';

export default async function handler(req, res) {
  await connectDB();
  try {
    const { name, prezzo, descrizione, foto} = req.body;
    if (!name || !prezzo || !descrizione || !foto) {
      return res.status(400).json({message: "Tutti i campi sono obligatori"});
    } 
    const existingProduct = await Product.findOne({name});
    if ( existingProduct){
      return res.status(400).json({message: " Prodotto già esistente"});
    } 
    console.log( "Creo nuvo Prodotto");
    const productToCreate = new Product({
      nome : name,
      prezzo : Number(prezzo),
      descrizione,
      foto: foto
    });
    await productToCreate.save();
    res.status(200).json({message: "Prodotto aggiunto con successo" });
  } catch(error) {
    console.error("Errore nel middleware di creazione prodotti:", error);
    res.status(500).json({message: "Errore del server"});
  }
}