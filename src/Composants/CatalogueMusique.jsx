import {catalogueMusiques} from "../Scripts/catalogueMusiques.js";
import {useState} from "react";
import Musique from "./Musique.jsx";
import GenreMusique from "./GenreMusique.jsx";

export default function CatalogueMusique() {
    //etat Musique
    const [etatZik, setZik] = useState(catalogueMusiques);

    //etat isEditing
    const [isEditing, setIsEditing] = useState(false)

    // état pour stocker le genre de la musique sélectionnée
    // eslint-disable-next-line no-unused-vars
    const [selectedGenre, setSelectedGenre] = useState('');

    // fonction pour etat de isEditing
    function handleToggleEditing() {
        setIsEditing((oldEditing) => !oldEditing);

    }


    //fonction ajouter Musique

    function ajouterMusique(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        console.log(formData)
        const nouvelleMusique = {
            id: catalogueMusiques.length + 1,
            nom: formData.get("nom"),
            src: formData.get("src"),
            auteur: formData.get("auteur"),
            prix: formData.get("prix"),
            date: new Date(formData.get("date"),
            )

        }
        console.log(nouvelleMusique);
        setZik([nouvelleMusique, ...etatZik])

        //Desactive mode edition
        setIsEditing(false);
    }

    // fonction supprimer musique
    function supprimerMusique(id) {
        setZik((etatZik) => etatZik.filter(musique => musique.id !== id));
    }

    return (
        <>
            <div className={"catalogue"}>
                {etatZik.map(etatZik => {
                    return (
                        <div key={etatZik.id}>

                            <Musique
                                key={etatZik.id}
                                date={etatZik.date}
                                nom={etatZik.nom}
                                src={etatZik.src}
                                auteur={etatZik.auteur}
                                prix={etatZik.prix}
                                genre={etatZik.genre}></Musique>
                            <button onClick={() => supprimerMusique(etatZik.id)}>Supprimer</button>
                            <button onClick={handleToggleEditing}>Ajouter</button>
                        </div>


                    )
                })}

            </div>
            <div className={"divclass"}>
                {isEditing && (
                    <form onSubmit={ajouterMusique}>
                        <label htmlFor="nom">Nom de la musique:</label>
                        <input type="text" id="nom" name="nom" placeholder="Entrez le nom de la musique"/>

                        <label htmlFor="src">Src Image:</label>
                        <input type="text" id="src" name="src" placeholder="Entrez le lien de l'image"/>

                        <label htmlFor="date">Date :</label>
                        <input type="date" id="date" name="date"/>

                        <label htmlFor="auteur">Auteur :</label>
                        <input type="text" id="auteur" name="auteur" placeholder="Entrez le nom de l'auteur"/>

                        <label htmlFor="prix">Prix :</label>
                        <input type="text" id="prix" name="prix" placeholder="Prix suggéré"/>

                        {/* Sous-composant pour sélectionner le genre */}
                        <GenreMusique onGenreChange={setSelectedGenre}/>

                        <button type="submit">Ajouter la nouvelle musique</button>
                    </form>
                )}
            </div>
        </>
    )
}