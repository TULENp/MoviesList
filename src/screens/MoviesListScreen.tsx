import { View, Text, Pressable, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { TAppNav, TMovie, TSort } from '../types';
import { MovieCard } from '../components/MovieCard';
import { GetAllMovies } from '../services/api';
import { SelectList } from 'react-native-dropdown-select-list';

//* Display list of movies 
export function MoviesListScreen() {
    //TODO Add pagination and update
    //TODO mb add store
    const { navigate, setOptions } = useNavigation<NavigationProp<TAppNav>>();

    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [moviesList, setMoviesList] = useState<TMovie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const sortTypes: TSort[] = [
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
    const [sortType, setSortType] = React.useState<string>(sortTypes[0].key);

    //add sort select to header
    useEffect(() => {
        setOptions({
            headerRight: () => (
                <SelectList
                    setSelected={(val: string) => setSortType(val)}
                    data={sortTypes}
                    defaultOption={sortTypes[0]}
                    save="key"
                    search={false}
                    boxStyles={{
                        backgroundColor: "white",
                        width: 200
                    }}
                    dropdownStyles={{
                        backgroundColor: "white",
                    }}
                />
            )
        });
    }, [])

    // get movies when currentPage changes 
    useEffect(() => {
        getAllMovies(sortType, currentPage);
    }, [currentPage])

    //get movies on 1st page when sort type changes
    useEffect(() => {
        setCurrentPage(1);
        getAllMovies(sortType, 1);
    }, [sortType])

    async function getAllMovies(sortType: string, currentPage: number) {
        setIsLoading(true);

        const moviesData = await GetAllMovies(sortType, currentPage);
        if (moviesData.results) {
            setMoviesList(moviesData.results)
            setCurrentPage(moviesData.page)
        }
        else {
            setError(moviesData);
        }
        setIsLoading(false);
    }

    function toPrevPage() {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }

    function toNextPage() {
        if (currentPage < 1000) {
            setCurrentPage(prev => prev + 1)
        }
    }

    return (
        <View style={styles.container}>
            {isLoading ?
                <>
                    <ActivityIndicator style={{ marginTop: 200 }} size="large" />
                    <Text style={{ fontSize: 20, marginTop: 10 }}>Загрузка...</Text>
                </>
                :
                (error
                    ?
                    <>
                        <Text>Ошибка:</Text>
                        <Text>{error}</Text>
                        <Text>Попробуйте использовать ВПН</Text>
                    </>
                    :
                    (moviesList.length === 0
                        ?
                        <Text>Movies list is empty</Text>
                        :
                        <FlatList
                            data={moviesList}
                            numColumns={2}
                            refreshing={isLoading}
                            onRefresh={() => getAllMovies(sortType, currentPage)}
                            renderItem={({ item }) =>
                                <Pressable onPress={() => navigate('Movie', { movie: item })}>
                                    <MovieCard movie={item} />
                                </Pressable>
                            }
                            ListFooterComponent={
                                <View style={styles.toolbar}>
                                    <Pressable style={styles.button} onPress={toPrevPage}>
                                        <Text>Назад</Text>
                                    </Pressable>
                                    <Text>{currentPage}</Text>
                                    <Pressable style={styles.button} onPress={toNextPage}>
                                        <Text>Вперед</Text>
                                    </Pressable>
                                </View>
                            }
                        />
                    )
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    button: {
        borderColor: 'black',
        borderWidth: 1,
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
})


