import { useAuth } from '../contexts/AuthContext';
import "./Landing.css";
export default function LandingPage() {
  const { login } = useAuth();

  return (
    <div className="landing-container">
     <div className="header-logo">
       <img src="/Users/costantinapesce/Downloads/logo.png" alt="Logo" className="logo-img" />
        <h1 className="landing-title">Benvenuto in SupermercatoSMART</h1>
      </div>

      
      <div className="landing-box">
        <p className="description-text">
          Il supermercato del futuro è già qui.<br />
          SupermercatoSMART ti offre una spesa intelligente, veloce e personalizzata, direttamente dal tuo smartphone.
        </p>
        <ul className="features-list">
          <li>🛒 Tanti prodotti e disponibilità</li>
          <li>📦 Raccomandazioni basate sulle tue abitudini</li>
          <li>🚀 Spesa pronta al ritiro e tracking delle consegne in real time</li>
          <li>📱 Controllo completo via app</li>
        </ul>
        <button className="login-button" onClick={login}>
          Inizia ora
        </button>
      </div>
    </div>
  );
}
