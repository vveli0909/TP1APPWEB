import {useState} from "react";

//sous composant pour le genre de musique
// eslint-disable-next-line react/prop-types
export default function GenreMusique({oneGenreChange}){

    //etat genre
    const [genre , setGenre] = useState('');

    //modifier genre
    function handleGenreChange(event){
        const selectedGenre = event.target.value;
        setGenre(selectedGenre);
        oneGenreChange(selectedGenre);//composant parent
    }
    return(
        <div>
            <label htmlFor="genre">Genre de la musique:</label><br/>
            <select id="genre" value={genre} onChange={handleGenreChange}>
                <option value="">Sélectionner un genre</option>
                <option value="R&B">R&B</option>
                <option value="PUNK">PUNK</option>
                <option value="Jazz">Jazz</option>
                <option value="RAP">RAP</option>
            </select>
        </div>
    )
}
