import jwt from 'jsonwebtoken';

const retrieveOrders = (req, res, next) => {
  try {
    // Verifica il token JWT dall'header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token mancante' });
    }

    const token = authHeader.substring(7); // Rimuove "Bearer "
    
    // Verifica il token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;

    // Aggiungi l'userId alla richiesta per il middleware successivo
    req.userId = userId;
    
    next();
  } catch (error) {
    console.error("Errore nel middleware di recupero ordini:", error);
    res.status(401).json({ message: "Token non valido" });
  }
}

export default retrieveOrders;