export default function Musique({dateDeCreation, nom, auteur, id, prix, src}) {

    return (
        <>
            <div>
                <img src={src}/>
                <p>{auteur}-{nom}</p>
                <p>date de sortis : {dateDeCreation}</p>
                <p>Genre : </p>
                <p>prix suggéré = {prix}</p>
            </div>

        </>
    )


}