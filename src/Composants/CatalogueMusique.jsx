import {useState, useEffect} from "react";
import Musique from "./Musique.jsx";
import GenreMusique from "./GenreMusique.jsx";
import {ThemeContext} from "./ThemeContext.jsx";
import {useContext} from "react";


// eslint-disable-next-line react/prop-types
export default function CatalogueMusique({musiqueState}) {

    //Context Musique
    const themeMusique = useContext(ThemeContext)

    // État des musiques
    const [etatZik, setZik] = musiqueState

    //etat isEditing
    const [isEditing, setIsEditing] = useState(false)

    // état pour stocker le genre de la musique sélectionnée
    const [selectedGenre, setSelectedGenre] = useState('');

    // etat pour modifier une musique
    const [musiqueActuelle, setMusiqueActuelle] = useState(null);


    // Sauvegarder `etatZik` dans localStorage à chaque changement
    useEffect(() => {
        localStorage.setItem("etatZik", JSON.stringify(etatZik));
    }, [etatZik]);


    // fonction pour etat edition
    function handleToggleEditing(musique) {
        setIsEditing((oldEditing) => !oldEditing);
        setMusiqueActuelle(musique)
    }


    //fonction ajouter ou modifier Musique
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
            date: new Date(formData.get("date")
            )


        };

        //verifie si modifier ou ajouter
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
                                genre={etatZik.genre}></Musique>
                            <button onClick={() => supprimerMusique(etatZik.id)}>Supprimer</button>
                            <button onClick={() => handleToggleEditing(etatZik)}>Modifier</button>
                        </div>


                    )
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
                               placeholder="Entrez le nom de la musique"/>

                        <label htmlFor="src">Src Image:</label>
                        <input type="text" id="src" name="src"
                               defaultValue={musiqueActuelle ? musiqueActuelle.src : ""}
                               placeholder="Entrez le lien de l'image"/>

                        <label htmlFor="date">Date :</label>
                        <input type="date" id="date" name="date"/>

                        <label htmlFor="auteur">Auteur :</label>
                        <input type="text" id="auteur" name="auteur"
                               defaultValue={musiqueActuelle ? musiqueActuelle.auteur : ""}
                               placeholder="Entrez le nom de l'auteur"/>

                        <label htmlFor="prix">Prix :</label>
                        <input type="text" id="prix" name="prix"
                               defaultValue={musiqueActuelle ? musiqueActuelle.prix : ""}
                               placeholder="Prix suggéré"/>

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