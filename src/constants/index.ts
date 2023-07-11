import { TSort } from "../types";

export const sortTypes: TSort[] = [
    {
        key: 'popularity.desc',
        value: 'Популярное',
    },
    {
        key: 'vote_average.desc',
        value: 'Высокий рейтинг',
    },
    {
        key: 'primary_release_date.desc',
        value: 'Новое',
    },
    {
        key: 'primary_release_date.asc',
        value: 'Старое',
    },
]