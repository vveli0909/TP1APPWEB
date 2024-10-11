import React, { useContext, useState } from "react";
import { CritiqueContext } from "./CritiqueContext";

export default function CritiqueForm({ musiqueState }) {
    const { ajouterCritique } = useContext(CritiqueContext);
    const [formData, setFormData] = useState({
        idMusique: "",
        flow: 0,
        lyric: 0,
        cover: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "idMusique" ? value : Number(value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const noteMoyenne = Math.round((formData.flow + formData.lyric + formData.cover) / 3);
        ajouterCritique({
            ...formData,
            dateCritique: new Date().toISOString(),
            noteMoyenne,
        });
        setFormData({ idMusique: "", flow: 0, lyric: 0, cover: 0 });
    };

    return (
        <form onSubmit={handleSubmit} className="critique-form">
            <select
                name="idMusique"
                value={formData.idMusique}
                onChange={handleChange}
                required
            >
                <option value="">Sélectionnez une musique</option>
                {musiqueState[0].map((musique) => (
                    <option key={musique.id} value={musique.id}>
                        {musique.nom}
                    </option>
                ))}
            </select>
            <div>
                <label htmlFor="flow">Flow (0-100) :</label>
                <input
                    type="number"
                    id="flow"
                    name="flow"
                    value={formData.flow}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                />
            </div>
            <div>
                <label htmlFor="lyric">Paroles (0-100) :</label>
                <input
                    type="number"
                    id="lyric"
                    name="lyric"
                    value={formData.lyric}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                />
            </div>
            <div>
                <label htmlFor="cover">Pochette (0-100) :</label>
                <input
                    type="number"
                    id="cover"
                    name="cover"
                    value={formData.cover}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                />
            </div>
            <button type="submit">Ajouter la critique</button>
        </form>
    );
}