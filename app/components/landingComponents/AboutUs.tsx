import React, { useEffect, useState } from 'react'
import fotogab from "/fotogab.jpg"
import fotoco from "/fotoco.jpeg"
import fotosa from "/fotosa.jpeg"

const images = [
  fotoco,
  fotosa,
  fotogab
]

const AboutUs = () => {

  const [currentImage, setCurrentImage] = useState(0)
  
  useEffect(() => {
    const currentImage = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia immagine ogni 3 secondi

    return () => clearInterval(currentImage); // Pulisci l'intervallo al termine del componente
  }, [images.length]);
  return (
    <div className="flex flex-col md:flex-row max-w-7xl gap-2 bg-black/20 rounded-xl p-6 mt-6 text-white text-left shadow-lg backdrop-blur-md">
      <div className='min-w-1/2 flex justify-center '>
        <img src={images[currentImage]} alt="currentImage" className=" h-96 rounded-full align-middle" />
      </div>
      <div className="flex flex-col text-2xl">
        <span className="block font-bold text-4xl mb-2">Chi siamo?</span>
        Ehilà! Siamo Gabriele, Sara e Costantina, studenti universitari pugliesi. Ognuno di noi porta il proprio contributo unico al progetto, e la nostra collaborazione è ciò che ci permette di affrontare le sfide e superarle con successo. Siamo convinti che, combinando le nostre competenze, possiamo creare qualcosa di veramente utile e innovativo. {<br/> }<br/>Abbiamo realizzato un supermercato online dove il cliente può aggiungere ordini in modo semplice e intuitivo, 
        visualizzare gli ordini precedenti ed eventualmente un amministratore può aggiungere di nuovi.
    
      </div>
    </div>
  )
}

export default AboutUs