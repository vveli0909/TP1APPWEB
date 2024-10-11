import {useState, useEffect} from "react";


//sous composant pour le genre de musique
// eslint-disable-next-line react/prop-types
export default function GenreMusique({oneGenreChange, genreInitial}) {

    //etat genre initialise avexc la valeur pase en prop si presente
    const [genre, setGenre] = useState(genreInitial || '');

    //synchroniser l'etat local avec la prop
    useEffect(() => {
        setGenre(genreInitial || '');
    }, [genreInitial]);

    //modifier genre
    function handleGenreChange(event) {
        const selectedGenre = event.target.value;
        setGenre(selectedGenre);
        oneGenreChange(selectedGenre);
        console.log(selectedGenre)//composant parent

    }

    return (
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
