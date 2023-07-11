import { makeAutoObservable, runInAction } from "mobx";
import { TMovie } from "../types";
import { GetAllMovies } from "../services/api";
import { sortTypes } from "../constants";


class MoviesStore {
    moviesList: TMovie[] = [];
    isLoading: boolean = false;
    error: string = '';
    currentPage: number = 1; // for pagination
    sortType: string = sortTypes[0].key; // for sort

    constructor() {
        makeAutoObservable(this);
    }

    async getAllMoviesAction() {
        this.isLoading = true;
        const moviesData = await GetAllMovies(this.sortType, this.currentPage);

        runInAction(() => {
            if (moviesData.results) {
                this.moviesList = moviesData.results;
            }
            else {
                this.error = moviesData;
            }
            this.isLoading = false;
        })
    }

    toNextPage(value: number = 1) {
        if (this.currentPage < 1000) {
            this.currentPage += value;
        }
    }

    toPrevPage(value: number = 1) {
        if (this.currentPage > 1) {
            this.currentPage -= value;
        }
    }

    changeSortType(value: string) {
        this.sortType = value;
    }
}

export const moviesStore = new MoviesStore()