import React from 'react'
import CircleLoader from 'react-spinners/CircleLoader'
import '../MovieBox.css'

import { getData } from '../getData'
class MoviesBox extends React.Component {
    constructor() {
        super()
        this.state = {
            movies: [],
            loading: true,
            error: false,
            q: '',
            page: { start: 0, end: 16 }
        }
    }

    componentDidMount() {
        getData()
            .then(data => this.setState({ loading: false, movies: data }))
            .catch(() => this.setState({ loading: false, error: true }))
    }
    filterData = data => {
        const { q } = this.state

        if (q === '') {
            return data
        }

        const movies = data.filter(e =>
            e.name.toLowerCase().includes(q.toLowerCase())
        )

        return movies
    }

    render() {
        const filteredList = this.filterData(this.state.movies)
        return this.state.loading ? (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <CircleLoader size={200} color='#36d7b7' />{' '}
            </div>
        ) : this.state.error ? (
            <div>Something went wrong</div>
        ) : (
            <div className='container'>
                <div className='header'>
                    <h1 className='welcome'>Hello There</h1>
                    <div className='search'>
                        <input
                            placeholder='Search'
                            type='search'
                            onChange={e => this.setState({ q: e.target.value })}
                        />
                    </div>
                </div>
                <div className='cardsContainer'>
                    {filteredList
                        .slice(this.state.page.start, this.state.page.end)
                        .map(e => {
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
                <div className='pagination'>
                    {new Array(Math.floor(filteredList.length / 16))
                        .fill(0)
                        .map((e, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    console.log(this.state.page)
                                    this.setState({
                                        page: { start: 16 * i, end: 16 * (i + 1) }
                                    })
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                </div>
            </div>
        )
    }
}

export default MoviesBox
