// eslint-disable-next-line react/prop-types
export default function Musique({src, nom, date, auteur, prix}) {

    return (
        <>
            <div className="carte">
                <img src={src}/>
                <p>{auteur} - {nom}</p>
                {/* eslint-disable-next-line react/prop-types */}
                <p>date de sortis : {date.toLocaleDateString()}</p>
                <p>Genre : </p>
                <p>prix suggéré = {prix}</p>
            </div>

        </>
    )


}



