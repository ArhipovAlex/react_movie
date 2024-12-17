import React from 'react';
import MovieList from '../components/MovieList';
import Reloader from '../components/Reloader';
import Search from '../components/Search';
import './Main.css';

class Main extends React.Component
{
    state={
        movies:[],
        loading:true,
        total:0
    }
    componentDidMount()
    {
        fetch('https://www.omdbapi.com/?i=tt3896198&apikey=a5aa9b8a&s=terminator')
        .then(response => response.json())
        .then(data=>this.setState({movies:data.Search, loading:false, total:data.totalResults}))
        console.log(this.state.movies);
    }
    searchMovie = (str, type='all', page) =>
    {
        this.setState({loading: true})
        fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=a5aa9b8a&s=${str}${type!=='all' ? `&type=${type}` : ''}${`&page=${page}`}`)
        .then(response=>response.json())
        .then(data=>this.setState({movies:data.Search, loading:false, total:data.totalResults}))
    }

    render()
    {
        const {movies} = this.state;
        console.log(this.state.movies);
        return(
            <div className='main'>
                <div className='wrap'>
                    <Search searchMovie={this.searchMovie} totalMovies={this.state.total}/>
                    {
                        //this.state.movies.length ? <MovieList movies={movies}/> : <Reloader />
                        !this.state.loading ? <MovieList movies={movies}/> : <Reloader />
                    }
                </div>
            </div>
        )
    }

}
export default Main;