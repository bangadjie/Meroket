import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'https://movie.tukanginyuk.com/api/getmovie';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    isLoading: false,
    totalResults: 0,
    dataMovie: [],
    id: '',
    modal_title: '',
    title: '',
    overview: '',
    voteaverage: '',
    posterpath: null
  }),

  actions: {
    async getAllMovies() {
      this.isLoading = true;

      try {
        const { data } = await axios.get(API_URL);
        if (data.status) {
          this.movies = data.data;
          this.totalResults = data.data.length; // Dummy totalResults, adjust according to your API
        } else {
          throw new Error('No movies found');
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async getMovieByID(id) {
      try {
        // Cari film berdasarkan ID di dalam array movies
        const data = this.movies.find(movie => movie.id === id);
        if (data.status) {
          this.dataMovie = data.data; // Update dataMovie state with the specific movie data
          // Assign specific movie data to individual properties
          this.id = data.data.id;
          this.modal_title = data.data.modal_title;
          this.title = data.data.title;
          this.overview = data.data.overview;
          this.voteaverage = data.data.voteaverage;
          this.posterpath = data.data.posterpath;
        } else {
          throw new Error('Movie not found');
        }
      } catch (error) {
        console.error(error);
      }
    },

    async nextPage() {
      this.isLoading = true;
      this.loadingMessage = "Please wait";
      try {
        const { data } = await axios.get(`${API_URL}?page=${this.page}`);
        if (data.Response === "False") {
          throw new Error("No more movies found");
        }
        if (data.Search) {
          this.movies.push(...data.Search);
        }
      } catch (error) {
        this.loadingMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});