import { useState, useEffect } from "react";
import Musique from "./Musique.jsx";
import GenreMusique from "./GenreMusique.jsx";
import { ThemeContext } from "./ThemeContext.jsx";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
export default function CatalogueMusique({ musiqueState }) {
    // Context Musique
    const themeMusique = useContext(ThemeContext);

    // État des musiques
    const [etatZik, setZik] = musiqueState;

    // État isEditing
    const [isEditing, setIsEditing] = useState(false);

    // État pour stocker le genre de la musique sélectionnée
    const [selectedGenre, setSelectedGenre] = useState('');

    // État pour modifier une musique
    const [musiqueActuelle, setMusiqueActuelle] = useState(null);

    // Sauvegarder `etatZik` dans localStorage à chaque changement
    useEffect(() => {
        localStorage.setItem("etatZik", JSON.stringify(etatZik));
    }, [etatZik]);

    // Fonction pour état édition
    function handleToggleEditing(musique) {
        setIsEditing((oldEditing) => !oldEditing);
        setMusiqueActuelle(musique);
    }

    // Fonction ajouter ou modifier Musique
    function ajouterOuModifierMusique(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Validation des champs obligatoires
        const nom = formData.get("nom");
        const src = formData.get("src");
        const auteur = formData.get("auteur");
        const prix = formData.get("prix");
        const date = formData.get("date");

        if (!nom || !src || !auteur || !prix || !selectedGenre || !date) {
            alert("Tous les champs sont obligatoires !");
            return;
        }

        const nouvelleMusique = {
            id: musiqueActuelle ? musiqueActuelle.id : etatZik.length + 1,
            nom: nom,
            src: src,
            auteur: auteur,
            prix: prix,
            genre: selectedGenre,
            date: new Date(date + 'T00:00:00')
        };

        // Vérifie si modifier ou ajouter
        if (musiqueActuelle) {
            setZik(
                etatZik.map((musique) =>
                    musique.id === musiqueActuelle.id ? nouvelleMusique : musique
                )
            );
        } else {
            setZik([nouvelleMusique, ...etatZik]);
        }

        // Désactive le mode édition
        setIsEditing(false);
        setMusiqueActuelle(null); // Réinitialise la musique actuelle
        setSelectedGenre(''); // Réinitialise le genre sélectionné
    }

    // Fonction supprimer musique
    function supprimerMusique(id) {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette musique ?")) {
            setZik((etatZik) => etatZik.filter(musique => musique.id !== id));
        }
    }

    return (
        <>
            <div className={"catalogue"}>
                {etatZik.map(etatZik => {
                    return (
                        <div key={etatZik.id} className={themeMusique}>
                            <Musique
                                key={etatZik.id}
                                date={etatZik.date}
                                nom={etatZik.nom}
                                src={etatZik.src}
                                auteur={etatZik.auteur}
                                prix={etatZik.prix}
                                genre={etatZik.genre}
                            />
                            <button onClick={() => supprimerMusique(etatZik.id)}>Supprimer</button>
                            <button onClick={() => handleToggleEditing(etatZik)}>Modifier</button>
                        </div>
                    );
                })}
            </div>
            <div>
                <button onClick={() => handleToggleEditing()}>Ajouter une nouvelle musique</button>
            </div>
            <div className={"formulaire"}>
                {isEditing && (
                    <form onSubmit={ajouterOuModifierMusique}>
                        <label htmlFor="nom">Nom de la musique:</label>
                        <input type="text" id="nom" name="nom"
                               defaultValue={musiqueActuelle ? musiqueActuelle.nom : ""}
                               placeholder="Entrez le nom de la musique" />

                        <label htmlFor="src">Src Image:</label>
                        <input type="text" id="src" name="src"
                               defaultValue={musiqueActuelle ? musiqueActuelle.src : ""}
                               placeholder="Entrez le lien de l'image" />

                        <label htmlFor="date">Date :</label>
                        <input type="date" id="date" name="date" />

                        <label htmlFor="auteur">Auteur :</label>
                        <input type="text" id="auteur" name="auteur"
                               defaultValue={musiqueActuelle ? musiqueActuelle.auteur : ""}
                               placeholder="Entrez le nom de l'auteur" />

                        <label htmlFor="prix">Prix :</label>
                        <input type="text" id="prix" name="prix"
                               defaultValue={musiqueActuelle ? musiqueActuelle.prix : ""}
                               placeholder="Prix suggéré" />

                        {/* Sous-composant pour sélectionner le genre */}
                        <GenreMusique oneGenreChange={setSelectedGenre} genreInitial={selectedGenre} />

                        <button type="submit">
                            {musiqueActuelle ? "Modifier la musique" : "Ajouter la nouvelle musique"}
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}
