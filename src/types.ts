
export type TAppNav = {
    List: undefined,
    Movie: { movie: TMovie },
}

export type TMovieInfo = {
    adult: boolean;
    budget: number;
    genres: { id: number; name: string }[];
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
}

export type TMovie = Pick<TMovieInfo, 'id' | 'poster_path' | 'title' | 'release_date' | 'vote_average'>;
