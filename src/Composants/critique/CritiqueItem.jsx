import React, { useContext } from "react";
import { CritiqueContext } from "./CritiqueContext";


export default function CritiqueItem({ critique, musique }) {
    const { supprimerCritique } = useContext(CritiqueContext);

    return (
        <div className="critique-item">
            <h3>Critique pour : {musique ? musique.nom : 'Musique inconnue'}</h3>
            <p>Date: {new Date(critique.dateCritique).toLocaleDateString()}</p>
            <p>Flow: {critique.flow}/100</p>
            <p>Paroles: {critique.lyric}/100</p>
            <p>Pochette: {critique.cover}/100</p>
            <p>Note moyenne: {critique.noteMoyenne}/100</p>
            <button onClick={() => supprimerCritique(critique.id)}>Supprimer</button>
        </div>
    );
}