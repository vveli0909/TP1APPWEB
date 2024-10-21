// eslint-disable-next-line react/prop-types
export default function Musique({src, nom, date, auteur, prix,genre}) {
    // Vérifier si la date est un objet Date, sinon créer une nouvelle date à partir de la chaîne
    // eslint-disable-next-line react/prop-types
    const formattedDate = new Date(date).toLocaleDateString('fr-CA', {
        timeZone: 'UTC',
    });

    return (
        <>
            <div className="carte">
                <img src={src} alt={nom}/>
                <p>{auteur} - {nom}</p>
                <p>date de sortis : {formattedDate}</p>
                <p>Genre : {genre}</p>
                <p>prix suggéré = {prix}$</p>
            </div>

        </>
    )


}



