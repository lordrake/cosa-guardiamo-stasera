import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Movie } from '../movie';
import FILMS from '../films.json';



@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {

  selectedMovie = {
    "Title": '',
    "Year": '',
    "Rated": '',
    "Released": '',
    "Runtime": '',
    "Genre": '',
    "Director": '',
    "Writer": '',
    "Actors": '',
    "Plot": '',
    "Language": '',
    "Country": '',
    "Awards": '',
    "Poster": '',
    "Metascore": '',
    "imdbRating": '',
    "imdbVotes": '',
    "imdbID": '',
    "Type": '',
    "Response": '',
    "Images": [''],
    "userRating": ''
  }

  localStorage = {} as any;
  movies: any[] = [];
  averageRating = 0;
  numVoti = 0;
  searchText : string = '';

  constructor() {
    this.movies = this.getMoviesData();
    this.averageRating = this.findAverageRating();
    this.numVoti = this.findNumberOfRatings();
  }

  ngOnInit(): void {
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;

  }

  getMoviesData() {
    this.localStorage = window.localStorage;
    console.log(typeof localStorage);
    let localData = JSON.parse(this.localStorage.getItem('movies'));
    if (localData) {
      //prendo dati salvati su Local Storage
      return localData;
    } else {
      //prendo dati da file JSON
      return FILMS;
    }
  }
  saveRating (movie: Movie): void {
    //aggiorno dati in local storage
    this.localStorage.setItem('movies', JSON.stringify(this.movies));
    //aggiorno statistiche
    this.averageRating = this.findAverageRating();
    this.numVoti = this.findNumberOfRatings();
  }

  //calcola numero voti
  findNumberOfRatings () {
    let numVoti = 0;
    this.movies.forEach(movie => {
      if (movie.userRating) {
        numVoti ++;
      }
    });

    return numVoti;
  }

  //calcola media voti
  findAverageRating () {
    let somma = 0;
    this.movies.forEach(movie => {
      if (movie.userRating) {
        somma += parseInt(movie.userRating);
      }
    });

    let numVoti = this.findNumberOfRatings();

    //arrotonda a due cifre decimali
    let average = parseFloat((somma / numVoti).toFixed(1));

    return average ? average : 0;
  }

}
