import React, { useState, useEffect } from "react";
import { CritiqueContext } from "./CritiqueContext";
import CritiqueForm from "./CritiqueForm";
import CritiqueItem from "./CritiqueItem";


export default function CritiqueCatalogue({ musiqueState,critiquesState }) {
    const [critiques, setCritiques] = critiquesState
    const [filtreMusique, setFiltreMusique] = useState("");

    useEffect(() => {
        localStorage.setItem("critiques", JSON.stringify(critiques));
    }, [critiques]);

    const ajouterCritique = (nouvelleCritique) => {
        setCritiques([...critiques, { ...nouvelleCritique, id: Date.now() }]);
    };

    const supprimerCritique = (id) => {
        setCritiques(critiques.filter((critique) => critique.id !== id));
    };

    const critiquesFiltrees = filtreMusique
        ? critiques.filter((critique) => critique.idMusique === filtreMusique)
        : critiques;

    return (
        <CritiqueContext.Provider value={{ critiques, ajouterCritique, supprimerCritique }}>
            <div className="critique-catalogue">
                <h2>Critiques de musique</h2>
                <CritiqueForm musiqueState={musiqueState} />
                <div>
                    <label htmlFor="filtreMusique">Filtrer par musique : </label>
                    <select
                        id="filtreMusique"
                        value={filtreMusique}
                        onChange={(e) => setFiltreMusique(e.target.value)}
                    >
                        <option value="">Toutes les musiques</option>
                        {musiqueState[0].map((musique) => (
                            <option key={musique.id} value={musique.id.toString()}>
                                {musique.nom}
                            </option>
                        ))}
                    </select>
                </div>
                {critiquesFiltrees.map((critique) => (
                    <CritiqueItem
                        key={critique.id}
                        critique={critique}
                        musique={musiqueState[0].find(m => m.id.toString() === critique.idMusique)}
                    />
                ))}
            </div>
        </CritiqueContext.Provider>
    );
}