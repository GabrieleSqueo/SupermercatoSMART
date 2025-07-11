import React from 'react'
import RefreshToken from '../app/models/refreshTokenModel.js'

const logout = (req, res) => {
    console.log("Richiesta di logout ricevuta")
    const refreshToken  = req.body.refreshToken
    console.log("Logout in corso, refreshToken:", refreshToken)
    
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh Token mancante' })
    }
    
    RefreshToken.findOneAndDelete({ token: refreshToken })
        .then(deletedToken => {         
        if (!deletedToken) {
            return res.status(404).json({ message: 'Refresh Token non trovato' })
        }
        res.status(200).json({ message: 'Logout effettuato con successo' })
    })
}

export default logout