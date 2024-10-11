import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//import Musique from "./Composants/Musique.jsx";
//import {catalogueMusiques} from "./Scripts/catalogueMusiques.js";
import CatalogueMusique from "./Composants/CatalogueMusique.jsx";
import {ThemeContext} from "./Composants/ThemeContext.jsx";
import Statistiques from "./Composants/Statistiques.jsx";
import {catalogueMusiques} from "./Scripts/catalogueMusiques.js";
import CritiqueCatalogue from "../src/Composants/critique/CritiqueCatalogue.jsx"




function App() {

    // État des musiques (chargé depuis localStorage ou catalogueMusiques par défaut)
    const musiqueState = useState(() => {
        const storedMusiques = localStorage.getItem("etatZik");
        return storedMusiques ? JSON.parse(storedMusiques) : catalogueMusiques;
    });

    // État pour gérer la vue courante
    const [vueActuelle, setVueActuelle] = useState('musique');

    // Fonctions pour changer de vue
    const afficherMusique = () => setVueActuelle('musique');
    const afficherCritique = () => setVueActuelle('critique');
    const afficherStatistiques = () => setVueActuelle('statistiques');


    // Rendu conditionnel des vues en fonction de l'état
    let contenuAffiche;
    if (vueActuelle === 'musique') {
        contenuAffiche = <CatalogueMusique musiqueState={musiqueState}/>;
    } else if (vueActuelle === 'critique') {
        contenuAffiche = <CritiqueCatalogue musiqueState={musiqueState} />;
    } else if (vueActuelle === 'statistiques') {
        contenuAffiche = <Statistiques musiqueState={musiqueState}/>;
    }


    return (
        <>

            <div>
                <ThemeContext.Provider value={"cardZik"}>
                    {/* Navbar stylisée */}
                    <div className="navbar">
                        <button
                            className={`navbar-btn ${vueActuelle === 'musique' ? 'active' : ''}`}
                            onClick={afficherMusique}
                        >
                            Musique
                        </button>
                        <button
                            className={`navbar-btn ${vueActuelle === 'critique' ? 'active' : ''}`}
                            onClick={afficherCritique}
                        >
                            Critique
                        </button>
                        <button
                            className={`navbar-btn ${vueActuelle === 'statistiques' ? 'active' : ''}`}
                            onClick={afficherStatistiques}
                        >
                            Statistiques
                        </button>
                    </div>

                    {/* Contenu de la section */}
                    <div className="contenu">
                        {contenuAffiche}
                    </div>
                </ThemeContext.Provider>
            </div>


        </>
    )
}

export default App
