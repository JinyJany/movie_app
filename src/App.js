import React, {Component} from 'react';
import './App.css';
import Movie from './Movie';




class App extends Component{

  state = {
    urlParam: "like_count"
  };
  information = ["title","year","rating","peers","seeds","download_count","like_count","date_added"];

  componentDidMount(){
    this._getMovies();
  }

  componentDidUpdate(){
    
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
    return fetch("https://yts.mx/api/v2/list_movies.json?sort_by=" + this.state.urlParam)
    .then(potato => potato.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  _titleClick(sParam){
    this.setState({
      urlParam: sParam
    })

    this._getMovies();
  }

  _titleBar = () => {
    const setTitlebar = this.information.map(nm => {
      return <a href="#" onClick={()=> this._titleClick(nm)}> {nm} </a>
    })

    return setTitlebar;
  }

  render(){
    const {movies} = this.state;
    return (
      <div>
        <div className="topnav">
          {movies ? this._titleBar() : ''}
        </div>
        <div className={ movies ? 'App' : 'App_loading'}>
          {movies ? this._renderMovies() : 'Loading...'}
        </div>
      </div>
    );
  }
}

export default App;
