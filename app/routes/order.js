import express from "express"
import Order from "../models/Order.js"
import newOrderMiddleware from "../api/newOrder.js"

const router = express.Router()

router.post("/newOrder", newOrderMiddleware, async(req, res) => {
    try {
        console.log(req.OrderToCreate)
        await req.OrderToCreate.save()
        res.status(200).json({message: "Ordine aggiunto con successo" })
    } catch (error) {
        console.error("Errore durante la creazione prodotto:", error);
        res.status(500).json({message: "Errore durante la creazione prodotto"});
    }
})

export default router;