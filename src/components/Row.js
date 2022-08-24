import React, { useEffect, useState } from "react";
import './Row.css'
import { getMovies } from "../api";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
const imageHost = "https://image.tmdb.org/t/p/original/"

function Row({title, path, isLarge}) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    const handleOnClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("")
        } else {
             movieTrailer(movie.name || movie.title || movie.original_name || "")
             .then((url) => {
                setTrailerUrl(url)
             })
        .catch((e) => {
            console.log("error fetching movie trailer: ", e)
        })
        }
        
    }

    const fetchMovies = async (_path) => {
        try {
            const data = await getMovies(_path)
            setMovies(data?.results)
        } catch (error) {
            console.log("fetchMovies error :", error)
        }
    };

    useEffect(() => { // QUANDO RENDERIZAR A PAGINA . ATT TBM SE HOUVER ATT NO PATH 
        fetchMovies(path) //path enviado do categories.map. Vem a url de cada categoria
    }, [path])

    return (
        <div className="row-container">
            <h2 className="row-header">{title}</h2>
            <div className="row-cards">
                {movies.map(movie => {
                    return(
                        <img className={`movie-card ${isLarge && "movie-card-large"}`}
                        onClick={() => handleOnClick(movie)}
                         key={movie.id} 
                         src={`${imageHost}${isLarge ? movie.backdrop_path : movie.poster_path }`} 
                         alt={movie.name}></img>
                    )
                })}
            </div>
            { trailerUrl && <ReactPlayer playing={true} url={trailerUrl} />}
        </div>
    )
}

export default Row