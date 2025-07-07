import express from "express"
import Order from "../models/Order.js"
import newOrderMiddleware from "../api/newOrder.js"
import retrieveOrdersMiddleware from "../api/retrieveOrders.js"

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

// GET /retrieveOrders - restituisce tutti gli ordini dell'utente loggato
router.get("/retrieveOrders", retrieveOrdersMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).sort({ _id: -1 });
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
        res.status(500).json({ success: false, message: "Errore interno del server" });
    }
});

export default router;