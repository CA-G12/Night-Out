import React from "react";
import '../MovieBox.css';

import { getData } from "../getData";
class MoviesBox extends React.Component {
    constructor() {
        super();
        this.state = {
            movie: [],
            Q: "",
            moviesData: [],

            page: { start: 0, end: 16 }

        };

    }
    componentDidMount() {
        getData().then((data) => this.setState({ movie: [...data], moviesData: [...data] }));
    }
    componentDidUpdate(prevProps, prevState) {
        const { Q } = this.state;
        if (Q === '') {
            getData().then((data) => this.setState({ movie: data }));
        }
        else if (prevState.Q !== Q) {
            this.filterData()
        }
    }
    setPagenationNext = () => {
        return this.setState({ page: { start: this.state.page.start + 16, end: this.state.page.end + 16 } })
    }
    setPagenationPrev = () => {
        return this.setState({ page: { start: this.state.page.start - 16, end: this.state.page.end - 16 } })
    }

    filterData = () => {
        const { Q, moviesData } = this.state;
        const movies = moviesData.filter(e =>
            e.name.toLowerCase().includes(Q.toLowerCase())
        )
        return this.setState({ movie: movies, page: { start: 0, end: 16 } });
    }
    render() {
        return (
            <div className='container'>
                <div className='header'>
                    <h1 className="welcome">Hello There</h1>
                    <div className='search'>
                        <input placeholder="Search" type='search' onChange={(e) => this.setState({ Q: e.target.value })} />
                    </div>
                </div>
                <div className='cardsContainer'>
                    {this.state.movie.slice(this.state.page.start, this.state.page.end).map((e) => {
                        return (
                            <div className='card' key={e.id}>
                                <h1>{e.name}</h1>
                                <img src={e.image.medium} alt={e.title} />
                                <div className='details'>
                                    <h2>Genres: {e.genres[0]}</h2>
                                    <h2>Rating: {e.rating.average} ⭐</h2>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="pagination">
                    {
                        new Array(this.state.moviesData.length / 16).fill(0).map((e, i) => <button key={i} onClick={() => {
                            console.log(this.state.page);
                            this.setState({ page: { start: 16 * (i), end: 16 * (i + 1) } })
                        }}>{i + 1}</button>)

                    }
                    {/* <button onClick={this.setPagenationPrev} disabled={this.state.page.start === 0 ? true : false} >{"<"}</button>
                    <button onClick={this.setPagenationNext} disabled={this.state.page.end > this.state.moviesData.length - 1 ? true : false}>{'>'}</button> */}
                </div>
            </div>

        )
    }
}

export default MoviesBox;
