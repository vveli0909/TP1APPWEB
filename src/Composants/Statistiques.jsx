import React, { useState } from 'react';
import Musique from "./Musique.jsx";

export default function Statistiques({ musiqueState, critiquesState }) {
    const [etatZik] = musiqueState;
    const [sortType, setSortType] = useState('average');

    // Fonction pour calculer les moyennes des critiques pour chaque musique
    const calculerMoyennesCritiques = (musiqueId) => {
        const critiquesPourMusique = critiquesState.filter(critique => critique.idMusique === musiqueId);
        const nbCritiques = critiquesPourMusique.length;

        if (nbCritiques === 0) return { flow: 0, lyrics: 0, cover: 0 };

        const totalFlow = critiquesPourMusique.reduce((total, critique) => total + (critique.flow || 0), 0);
        const totalLyrics = critiquesPourMusique.reduce((total, critique) => total + (critique.lyrics || 0), 0);
        const totalCover = critiquesPourMusique.reduce((total, critique) => total + (critique.cover || 0), 0);

        return {
            flow: totalFlow / nbCritiques,
            lyrics: totalLyrics / nbCritiques,
            cover: totalCover / nbCritiques
        };
    };

    // Fonction de tri en fonction du critère sélectionné
    const trierPar = (criteria) => {
        return [...etatZik].sort((a, b) => {
            const moyennesA = calculerMoyennesCritiques(a.id);
            const moyennesB = calculerMoyennesCritiques(b.id);

            switch (criteria) {
                case 'flow':
                    return moyennesB.flow - moyennesA.flow;
                case 'lyrics':
                    return moyennesB.lyrics - moyennesA.lyrics;
                case 'cover':
                    return moyennesB.cover - moyennesA.cover;
                case 'average':
                    const moyenneA = (moyennesA.flow + moyennesA.lyrics + moyennesA.cover) / 3;
                    const moyenneB = (moyennesB.flow + moyennesB.lyrics + moyennesB.cover) / 3;
                    return moyenneB - moyenneA;
                case 'prix':
                    return a.prix - b.prix;
                case 'date':
                    return new Date(a.date) - new Date(b.date);
                default:
                    return 0;
            }
        });
    };

    const musiquesTriees = trierPar(sortType);

    return (
        <div className="statistiques">
            <h2>Statistiques des Musiques</h2>
            <div>
                <label htmlFor="sortType">Trier par : </label>
                <select
                    id="sortType"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                >
                    <option value="average">Moyenne</option>
                    <option value="flow">Flow</option>
                    <option value="lyrics">Paroles</option>
                    <option value="cover">Pochette</option>
                    <option value="prix">Prix</option>
                    <option value="date">Date</option>
                </select>
            </div>
            <div className="catalogue">
                <div className="musique-catalogue">
                    {musiquesTriees.map(musique => (
                        <div key={musique.id} className="musique-carte">
                            <Musique
                                date={musique.date}
                                nom={musique.nom}
                                src={musique.src}
                                auteur={musique.auteur}
                                prix={musique.prix}
                                genre={musique.genre}
                                flow={calculerMoyennesCritiques(musique.id).flow}
                                lyrics={calculerMoyennesCritiques(musique.id).lyrics}
                                cover={calculerMoyennesCritiques(musique.id).cover}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
