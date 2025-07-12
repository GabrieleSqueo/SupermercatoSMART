import RefreshToken from '../app/models/refreshTokenModel.js'
import { connectDB } from '../db.js'

const logout = async (req, res) => {
    try {
        console.log("Richiesta di logout ricevuta")
        const refreshToken = req.body.refreshToken
        
        
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh Token mancante' })
        }
        
        // Assicurati che la connessione al database sia stabilita
        await connectDB()
        
        const deletedToken = await RefreshToken.findOneAndDelete({ token: refreshToken })
        
        if (!deletedToken) {
            return res.status(404).json({ message: 'Refresh Token non trovato' })
        }
        
        res.status(200).json({ message: 'Logout effettuato con successo' })
    } catch (error) {
        console.error('Errore durante il logout:', error)
        res.status(500).json({ message: 'Errore interno del server durante il logout' })
    }
}

export default logout