import React from "react";
import { getData } from "../getData";
const MoviesBox = () => {
    const [movie, setMovie] = React.useState([]);
    React.useEffect(() => {
        getData()
            .then((data) => {
                console.log(data.data.movies);
                const movies = data.data.movies
                setMovie(movies);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div>
            {movie.map((e) => {
                return <div>
                    <h1>{e.title}</h1>
                    <img src={e.small_cover_image} />
                </div>
            })}
        </div>

    )
}
export default MoviesBox;
