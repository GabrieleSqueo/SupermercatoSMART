import express from "express"
import registerMidlleware from "../api/register.js"

const router = express.Router()

router.post("/register", registerMidlleware, async(req, res) => {
    try {
        console.log("Sono nel terzo try")
        await req.userToCreate.save()
        res.status(200).json({message: "Utente registrato con successo" })
    } catch (error) {
        console.error("Errore salvando l'utente:", error)
        
        res.status(500).json({message: "Errore durante la registrazione"})
    }
})

export default router;