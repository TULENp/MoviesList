import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { TAppNav, TMovie } from '../types';
import { MovieCard } from '../components/MovieCard';
import { GetAllMovies } from '../services/api';

//* Display list of movies 
export function MoviesListScreen() {
    //TODO add filters
    const { navigate } = useNavigation<NavigationProp<TAppNav>>();

    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [moviesList, setMoviesList] = useState<TMovie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        getAllMovies();

    }, [])

    // async function getAllMovies() {
    //     setIsLoading(true);

    //     const res: TResult = await GetAllMovies();
    //     if (typeof res === 'string') {
    //         setError(res.toString());
    //     }
    //     else {
    //         setMoviesList(res.results)
    //         setCurrentPage(res.page)
    //     }
    //     setIsLoading(false);
    //     console.log('error:' + error, moviesList);
    //     console.log('list:', moviesList);
    //     console.log( res);
    // }
    // async function getAllMovies() {
    //     setIsLoading(true);

    //     const res: TResult<TMoviesListResult> = await GetAllMovies(); // get request result
    //     if (res.error) {
    //         setError(res.error);
    //     }
    //     else {
    //         setMoviesList(res.result.results)
    //         setCurrentPage(res.result.page)
    //     }
    //     setIsLoading(false);
    // }

    async function getAllMovies() {
        setIsLoading(true);

        const moviesData = await GetAllMovies();
        if (moviesData.results) {
            setMoviesList(moviesData.results)
            setCurrentPage(moviesData.page)
        }
        else {
            setError(moviesData);
        }
        setIsLoading(false);
    }


    return (
        <View style={styles.container}>
            {isLoading
                ?
                <Text>Loading...</Text>
                :
                (error
                    ?
                    <>
                        <Text>Error:</Text>
                        <Text>{error}</Text>
                        <Text>Try to use VPN</Text>
                    </>
                    :
                    (moviesList.length === 0
                        ?
                        <Text>Movies list is empty</Text>
                        :
                        <FlatList
                            data={moviesList}
                            numColumns={2}
                            renderItem={({ item }) =>
                                <Pressable onPress={() => navigate('Movie', { movie: item })}>
                                    <MovieCard movie={item} />
                                </Pressable>
                            }
                        />))
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
})


