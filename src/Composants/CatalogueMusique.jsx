import {catalogueMusiques} from "../Scripts/catalogueMusiques.js";
import {useState} from "react";
import Musique from "./Musique.jsx";
import GenreMusique from "./GenreMusique.jsx";
import {ThemeContext} from "./ThemeContext.jsx";
import {useContext} from "react";

export default function CatalogueMusique() {

    //Context Musique
    const theme = useContext(ThemeContext)
    //etat Musique
    const [etatZik, setZik] = useState(catalogueMusiques);

    //etat isEditing
    const [isEditing, setIsEditing] = useState(false)

    // état pour stocker le genre de la musique sélectionnée
    // eslint-disable-next-line no-unused-vars
    const [selectedGenre, setSelectedGenre] = useState('');

    // etat pour modifier une musique
    // eslint-disable-next-line no-unused-vars
    const [musiqueActuelle, setMusiqueActuelle] = useState(null);

    // fonction pour etat de isEditing
    function handleToggleEditing(musique) {
        setIsEditing((oldEditing) => !oldEditing);
        setMusiqueActuelle(musique)
        setSelectedGenre(musique.genre)

    }


    //fonction ajouter Musique

    function ajouterOuModifierMusique(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        console.log(formData)
        const nouvelleMusique = {
            id: musiqueActuelle ? musiqueActuelle.id : etatZik.length + 1,
            nom: formData.get("nom"),
            src: formData.get("src"),
            auteur: formData.get("auteur"),
            prix: formData.get("prix"),
            genre: selectedGenre,
            date: new Date(formData.get("date"),
            )


        };
        console.log(selectedGenre)

        if (musiqueActuelle) {
            setZik(
                etatZik.map((musique) =>
                    musique.id === musiqueActuelle.id ? nouvelleMusique : musique
                )
            );
        } else {
            setZik([nouvelleMusique, ...etatZik])
        }
        //Desactive mode edition
        setIsEditing(false);
        setMusiqueActuelle(null);//reinitialise la musique actuelle
        setSelectedGenre('');//reinitialise le genre selectionne

    }


    // fonction supprimer musique
    function supprimerMusique(id) {
        setZik((etatZik) => etatZik.filter(musique => musique.id !== id));
    }

    return (
        <>
            <div>
                <button onClick={() => handleToggleEditing()}>Ajouter</button>
            </div>
            <div className={"catalogue"}>
                {etatZik.map(etatZik => {
                    return (
                        <div key={etatZik.id} className={theme}>

                            <Musique
                                key={etatZik.id}
                                date={etatZik.date}
                                nom={etatZik.nom}
                                src={etatZik.src}
                                auteur={etatZik.auteur}
                                prix={etatZik.prix}
                                genre={etatZik.genre}></Musique>
                            <button onClick={() => supprimerMusique(etatZik.id)}>Supprimer</button>
                            <button onClick={() => handleToggleEditing(etatZik)}>Modifier</button>
                        </div>


                    )
                })}


            </div>
            <div className={"divclass"}>
                {isEditing && (
                    <form onSubmit={ajouterOuModifierMusique}>
                        <label htmlFor="nom">Nom de la musique:</label>
                        <input type="text" id="nom" name="nom" defaultValue={musiqueActuelle ? musiqueActuelle.nom : ""}
                               placeholder="Entrez le nom de la musique"/>

                        <label htmlFor="src">Src Image:</label>
                        <input type="text" id="src" name="src" defaultValue={musiqueActuelle ? musiqueActuelle.src : ""}
                               placeholder="Entrez le lien de l'image"/>

                        <label htmlFor="date">Date :</label>
                        <input type="date" id="date" name="date"
                               defaultValue={musiqueActuelle ? musiqueActuelle.date.toLocaleDateString() : ""}/>

                        <label htmlFor="auteur">Auteur :</label>
                        <input type="text" id="auteur" name="auteur"
                               defaultValue={musiqueActuelle ? musiqueActuelle.auteur : ""}
                               placeholder="Entrez le nom de l'auteur"/>

                        <label htmlFor="prix">Prix :</label>
                        <input type="text" id="prix" name="prix"
                               defaultValue={musiqueActuelle ? musiqueActuelle.prix : ""} placeholder="Prix suggéré"/>

                        {/* Sous-composant pour sélectionner le genre */}
                        <GenreMusique oneGenreChange={setSelectedGenre} genreInitial={selectedGenre}/>

                        <button type="submit">
                            {musiqueActuelle ? "Modifier la musique" : "Ajouter la nouvelle musique"}
                        </button>
                    </form>
                )}
            </div>
        </>
    )
}