import React from "react";
import '../MovieBox.css';

import { getData } from "../getData";
class MoviesBox extends React.Component {
    constructor() {
        super();
        this.state = {
            movie: [],
            Q: ""
        };

    }
    componentDidMount() {
        getData().then((data) => this.setState({ movie: data }));
    }
    componentDidUpdate(prevProps, prevState) {
        const { Q } = this.state;
        if (Q === '') {
            getData().then((data) => this.setState({ movie: data }));
        }
        else if (prevState.Q !== Q) {
            this.searchFun()
        }
    }

    searchFun = () => {
        const { movie, Q } = this.state;
        const movies = movie.filter(e =>
            e.name.toLowerCase().includes(Q.toLowerCase())
        )
        return this.setState({ movie: movies });
    }
    render() {
        return (
            <div className='container'>
                <div className='search'>
                    {/* <h1>Home</h1> */}
                    <input placeholder="Search" type='search' onChange={(e) => this.setState({ Q: e.target.value })} />
                </div>
                <div className='cardsContainer'>

                {this.state.movie.slice(0, 80).map((e) => {
                    return (
                        <div className='card' key={e.id}>
                            <h1>{e.name}</h1>
                            <img src={e.image.medium} alt={e.title} />
                        </div>
                    )
                })}
            </div>
            </div>

        )
    }
}

export default MoviesBox;
