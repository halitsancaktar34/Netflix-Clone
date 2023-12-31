import axios from "axios";
import { options } from './../../constants/costants';
import { actionTypes } from './../reducers/actionTypes';

// BaseURL
axios.defaults.baseURL = "https://api.themoviedb.org/3";

// Popüler Filmleri Al
export const getPopular = () => (dispatch) => {
    axios
        .get("/movie/popular", options)
        .then((res) => dispatch({ type: actionTypes.SET_MOVIES, payload: res.data.results, }))
        .catch((err) => dispatch({ type: actionTypes.SET_MOVIES_ERROR }))
};

// kategori verilerini al
export const setGenres = () => (dispatch) => {
    axios
    .get('/genre/movie/list?language=en', options)
    .then((res) => dispatch({type: actionTypes.SET_GENRES, payload: res.data.genres}))
    .catch((err) => dispatch({type: actionTypes.SET_GENRES_ERROR}))
}