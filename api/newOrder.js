import React from 'react'
import Order from "../models/Order.js"


const newOrder = (req, res, next) => {
    
    try {
        
        const {prodotti, costoTotale, utente} = req.body;
        if (!prodotti || !costoTotale) {
            return res.status(400).json({message: "Mancano i prodotti"});
        }
        
        
        const newProdotti = JSON.stringify(prodotti.map(({nome, quantità}) => ({nome, quantità})))
        console.log(newProdotti)
        console.log("utente" + utente)

        console.log("Creo il nuovo ordine")
        req.OrderToCreate = new Order({
            prodottiComprati: newProdotti,
            costo: Number(costoTotale),
            userId: utente
        });
        
        next()

    } catch (error) {
        console.error("Errore nel middleware di creazione ordini:", error);
        res.status(500).json({message: "Errore del server"});
    }
}

export default newOrder