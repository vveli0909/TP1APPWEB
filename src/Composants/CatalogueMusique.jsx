import {catalogueMusiques} from "../Scripts/catalogueMusiques.js";
import {useState} from "react";
import Musique from "./Musique.jsx";

export default function CatalogueMusique(){
    //etat Musique
    const [etatZik, setZik] = useState(catalogueMusiques);

    //etat isEditing
    const [isEditing, setIsEditing] = useState(true)

    // fonction pour etat de isEditing
    function handleToggleEditing() {
        setIsEditing((oldEditing) => !oldEditing);

    }

    //fonction ajouter Musique
    // eslint-disable-next-line no-unused-vars
    function ajouterMusique(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        console.log(formData)
        const nouvelleMusique = {
            id:catalogueMusiques.length + 1,
            nom:formData.get("nom"),
            src:formData.get("src"),
            auteur:formData.get("auteur"),
            prix:formData.get("date"),
            date:new Date(formData.get("date"),

    )

        }
        console.log(nouvelleMusique);
        setZik([nouvelleMusique,...etatZik])
    }

    return(
        <>
            <div>
                <input type="checkbox" id={"edit-mode"} onClick={handleToggleEditing}/>
                <label htmlFor={"edit-mode"}>Mode edition</label>
            </div>
            <div className={"catalogue"}>
                {etatZik.map(etatZik => {
                    return (
                        <Musique
                            key={etatZik.id}
                            date={etatZik.date}
                            nom={etatZik.nom}
                            src={etatZik.src}
                            auteur={etatZik.auteur}
                            prix={etatZik.prix}></Musique>
                    )
                })}

            </div>
            <div className={"divclass"}>
                {/*affichage conditionnel*/}
                {isEditing && (
                    <form onSubmit={ajouterMusique}>
                        <label htmlFor="nom">Nom de la musique:</label><br/>
                        <input type="text" id="nom" name="nom"/><br/>
                        <label htmlFor="src">Src de image:</label><br/>
                        <input type="text" id="src" name="src"/><br/>
                        <label htmlFor="date">Date :</label><br/>
                        <input type="date" id="date" name="date"/><br/>
                        <label htmlFor="auteur">Auteur :</label><br/>
                        <input type="text" id="auteur" name="auteur"/><br/>
                        <label htmlFor="prix">Prix :</label><br/>
                        <input type="text" id="prix" name="prix"/><br/>
                        <button type='submit'>Ajouter la nouvelle musique</button>
                    </form>
                )
                }
            </div>
        </>
    )
}