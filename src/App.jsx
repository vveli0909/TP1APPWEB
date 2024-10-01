//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//import Musique from "./Composants/Musique.jsx";
//import {catalogueMusiques} from "./Scripts/catalogueMusiques.js";
import CatalogueMusique from "./Composants/CatalogueMusique.jsx";
import {ThemeContext} from "./Composants/ThemeContext.jsx";

function App() {


    return (
        <>
            <ThemeContext.Provider value={"cardZik"}>
                <h1>TP1-VELI-LAPAIX</h1>
                <CatalogueMusique/>
            </ThemeContext.Provider>

        </>
    )
}

export default App
