import React from 'react'
import Product from "../models/Products.js";

const newProducts = async (req, res, next) => {
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
        req.productToCreate = new Product({
            nome : name,
            prezzo : Number(prezzo),
            descrizione,
            foto: foto
        });

        next();
    } catch(error) {
        console.error("Errore nel middleware di creazione prodotti:", error);
        res.status(500).json({message: "Errore del server"});
    }
}

export default newProducts