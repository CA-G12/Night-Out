import React from "react";
import { getData } from "../getData";
class MoviesBox extends React.Component {
    constructor() {
        super();
        this.state = {
            movie: []
        };
    }
    componentDidMount() {
        getData().then((data) => {
            console.log(data);
            return this.setState({ movie: data })
        });
    }
    render() {
        return (
            <div>
                {this.state.movie.slice(0, 50).map((e) => {
                    return <div key={e.id}>
                        <h1>{e.name}</h1>
                        <img src={e.image.medium || 'https://media.istockphoto.com/vectors/error-404-page-not-found-vector-id673101428?k=20&m=673101428&s=170667a&w=0&h=sifFCXQls5ygak3Y-II0cI1tibgQZVyPWzpLHtHKOGg='} alt={e.title} />
                    </div>
                })}
            </div>

        )
    }
}

export default MoviesBox;
