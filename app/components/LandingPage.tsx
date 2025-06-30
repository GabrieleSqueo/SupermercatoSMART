import { useAuth } from '../contexts/AuthContext';
import logo from "../../public/logo.png";
import appImage from "../../public/supermercatosmart-app.png";
import "./Landing.css";

export default function LandingPage() {
  const { login } = useAuth();

  return (
    <div className="landing-container">
      <div className="header-logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <h1 className="landing-title">Benvenuto in SupermercatoSMART</h1>
      </div>

      <div className="landing-box">
        <p className="description-text">
          Il supermercato del futuro è già qui.<br />
          SupermercatoSMART ti offre una spesa intelligente, veloce e personalizzata, direttamente dal tuo smartphone.
        </p>

        <img
          src={appImage}
          alt="App SupermercatoSMART"
          className="landing-image"
        />

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

    {/* Presentazione in basso a destra */}
      <div className="presentation">
        Ehilà! Siamo Gabriele, Sara e Costantina, studenti universitari pugliesi. 
        Ognuno di noi porta il proprio contributo unico al progetto, e la nostra collaborazione è ciò che ci permette di affrontare le sfide e superarle con successo. 
        Siamo convinti che, combinando le nostre competenze, possiamo creare qualcosa di veramente utile e innovativo.Abbiamo realizzato un supermercato online dove il cliente può aggiungere ordini in modo semplice e intuitivo.
    
      </div>
    </div>
  );
}