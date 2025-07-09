import React from 'react'
import Order from "../app/models/Order.js"


const newOrder = async (req, res) => {
    
    try {
        
        const {prodotti, costoTotale, utente} = req.body;
        if (!prodotti || !costoTotale) {
            return res.status(400).json({message: "Mancano i prodotti"});
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

export default newOrder