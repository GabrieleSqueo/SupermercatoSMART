import User from '../app/models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import RefreshToken from '../app/models/refreshTokenModel.js';
import jwt from 'jsonwebtoken';
import { connectDB } from '../app/utils/db.js';

dotenv.config();

const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { userId: userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
        { userId: userId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
    return { accessToken, refreshToken };
};

export default async function handler(req, res) {
    await connectDB();
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: "Utente non trovato" });
        }
        const passwordValida = await bcrypt.compare(password, existingUser.password);
        if (!passwordValida) {
            return res.status(401).json({ message: "Password non valida" });
        }
        const { accessToken, refreshToken } = generateTokens(existingUser._id);
        await RefreshToken.create({ token: refreshToken, userId: existingUser._id });
        res.status(200).json({
            message: "Login effettuato con successo",
            user: {
                id: existingUser._id,
                email: existingUser.email
            },
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error("Errore nel login:", error);
        res.status(500).json({ message: "Errore del server" });
    }
} 