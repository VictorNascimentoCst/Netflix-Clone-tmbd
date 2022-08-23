import React, { useEffect, useState } from "react";
import './Row.css'
import { getMovies } from "../api";
const imageHost = "https://image.tmdb.org/t/p/original/"

function Row({title, path}) {
    const [movies, setMovies] = useState([])
    const fetchMovies = async (_path) => {
        try {
            const data = await getMovies(_path)
            console.log(data)
            setMovies(data?.results)
        } catch (error) {
            console.log("fetchMovies error :", error)
        }
    };

    useEffect(() => {
        fetchMovies(path)
    }, [path])
    return (
        <div className="row-container">
            <h2 className="row-header">{title}</h2>
            <div className="row-cards">
                {movies.map(movie => {
                    return(
                        <img className="movie-card" key={movie.id} src={`${imageHost}${movie.poster_path}`} alt={movie.name}></img>
                    )
                })}
            </div>
        </div>
    )
}

export default Row