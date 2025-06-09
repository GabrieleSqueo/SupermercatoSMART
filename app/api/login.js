import User from "../models/User.js";
import bcrypt from "bcrypt";

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
    
        if (!email || !password) {
            return res.status(400).json({message: "Tutti i campi sono obbligatori"});
        }

        const existingUser = await User.findOne({email});

        if (!existingUser) {
            return res.status(401).json({message: "Utente non trovato"});
        }

        const passwordValida = await bcrypt.compare(password, existingUser.password);
        
        if (!passwordValida) {
            return res.status(401).json({message: "Password non valida"});
        }

        // Aggiungi le informazioni dell'utente alla richiesta
        req.user = {
            id: existingUser._id,
            email: existingUser.email
        };
        
        next();
    } catch (error) {
        console.error("Errore nel middleware di login:", error);
        res.status(500).json({message: "Errore del server"});
    }
}

export default login