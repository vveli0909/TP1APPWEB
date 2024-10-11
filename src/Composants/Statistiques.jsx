import React, { useState } from 'react';
import Musique from "./Musique.jsx";
export default function Statistiques({ musiqueState }) {
    const [etatZik] = musiqueState;
    const [sortType, setSortType] = useState('average');
    const trierPar = (criteria) => {
        return [...etatZik].sort((a, b) => {
            switch (criteria) {
                case 'flow':
                    return b.flow - a.flow;
                case 'lyrics':
                    return b.lyrics - a.lyrics;
                case 'cover':
                    return b.cover - a.cover;
                case 'average':
                    return (b.flow + b.lyrics + b.cover) / 3 - (a.flow + a.lyrics + a.cover) / 3;
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
                                flow={musique.flow}
                                lyrics={musique.lyrics}
                                cover={musique.cover}
                            />

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}