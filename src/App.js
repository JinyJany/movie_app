import React, {Component} from 'react';
import './App.css';
import Movie from './Movie';




class App extends Component{

  state = {};

  componentWillMount(){
    console.log('will mount');
  }

  componentDidMount(){
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      return <Movie key={movie.id} title={movie.title} poster={movie.medium_cover_image} genres={movie.genres} synopsis={movie.synopsis}/>
    })

    return movies;
  }

   _getMovies = async () => {
    //async 비동기 순서와 상관없이 진행됨
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch("https://yts.mx/api/v2/list_movies.json?sort_by=like_count")
    .then(potato => potato.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render(){
    const {movies} = this.state;
    return (
      <div className={ movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
