
export type TAppNav = {
    List: undefined,
    Movie: { movie: TMovie },
}

export type TMovie = {
    id: number,
    poster_path: string,
    title: string,
    genre_ids: string[]
    release_date: string,
    overview: string,
    vote_average: number
}
