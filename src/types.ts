
export type TAppNav = {
    List: undefined,
    Movie: { movie: TMovie },
}

export type TMovie = {
    id: number,
    image: string,
    title: string,
    date: string
}