import express from "express"
import registerMidlleware from "../api/register.js"
import loginMiddleware from "../api/login.js"
import logoutMiddleware from "../api/logout.js"
import jwt from "jsonwebtoken"

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
            },
            accessToken: accessToken
        });
    } catch (error) {
        console.error("Errore durante il login:", error);
        res.status(500).json({message: "Errore durante il login"});
    }
})

router.post("/logout",logoutMiddleware, async (req, res) => {
    try {  
        // Rimuovi il refresh token dal database
        await req.refreshTokenToDelete.remove();
        
        // Rimuovi il cookie del refresh token
        res.status(200).json({ message: "Logout effettuato con successo" });
    } catch (error) {
        console.error("Errore durante il logout:", error);
        res.status(500).json({ message: "Errore durante il logout" });
    }   
})

export default router;