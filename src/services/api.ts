import axios from "axios";
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTk4OGU5ODljMjllOTQ1NzRhOWU4ZjA1OWU2MmRjMSIsInN1YiI6IjY0YTQwM2YxMTEzODZjMDBmZmZhNDcyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t6MyblAlkTCfg4p2oB7_efkhtwMeoe9ET988l2CnTAc';

export const postersURL = 'https://image.tmdb.org/t/p/w185'; // url to posters directory

// if success returns object with page: number, results: array of movies
export async function GetAllMovies() {
    return await axios.get('/discover/movie?include_adult=false&include_video=false&language=ru-RU&page=1&sort_by=popularity.desc',
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


