import axios from "axios";
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const token = '';

export const postersURL = 'https://image.tmdb.org/t/p/w185'; // url to posters directory

// if success returns object with page: number, results: array of movies
export async function GetAllMovies(sortType: string, currentPage: number) {
    return await axios.get(`/discover/movie?include_adult=false&include_video=false&language=ru-RU&page=${currentPage}&sort_by=${sortType}&vote_average.desc`,
        {
            headers: {
                accept: 'application/json',
                Authorization: token
            }
        })
        .then(response => response.data)
        .catch(error => error.toString());
}

// if success returns movie object
export async function GetMovieById(id: number) {
    return await axios.get(`/movie/${id}?language=ru-RU`,
        {
            headers: {
                accept: 'application/json',
                Authorization: token
            }
        })
        .then(response => response.data)
        .catch(error => error.toString());
}


