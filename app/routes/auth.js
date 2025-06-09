import express from "express"
import registerMidlleware from "../api/register.js"
import loginMiddleware from "../api/login.js"

const router = express.Router()

router.post("/register", registerMidlleware, async(req, res) => {
    try {
        await req.userToCreate.save()
        res.status(200).json({message: "Utente registrato con successo" })
    } catch (error) {
        console.error("Errore salvando l'utente:", error)
        
        res.status(500).json({message: "Errore durante la registrazione"})
    }
})

router.post("/login", loginMiddleware, async(req, res) => {
    try {
        res.status(200).json({
            message: "Login effettuato con successo",
            user: {
                id: req.user.id,
                email: req.user.email
            }
        });
    } catch (error) {
        console.error("Errore durante il login:", error);
        res.status(500).json({message: "Errore durante il login"});
    }
})

export default router;