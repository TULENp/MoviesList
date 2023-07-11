import { View, Text, Pressable, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { TAppNav } from '../types';
import { MovieCard } from '../components/MovieCard';
import { observer } from 'mobx-react-lite';
import { moviesStore } from '../stores/MoviesStore';

//* Display list of movies and sort(in header)
export const MoviesListScreen = observer(() => {
    const { navigate } = useNavigation<NavigationProp<TAppNav>>();

    // get movies when current page changes 
    useEffect(() => {
        moviesStore.getAllMoviesAction();
    }, [moviesStore.currentPage])

    //get movies on 1st page when sort type changes
    useEffect(() => {
        moviesStore.toPrevPage(moviesStore.currentPage - 1); // set current page to 1
        moviesStore.getAllMoviesAction();
    }, [moviesStore.sortType])


    return (
        <View style={styles.container}>
            {moviesStore.isLoading ?
                <>
                    <ActivityIndicator style={{ marginTop: 200 }} size="large" />
                    <Text style={{ fontSize: 20, marginTop: 10 }}>Загрузка...</Text>
                </>
                :
                (moviesStore.error
                    ?
                    <>
                        <Text>Ошибка:</Text>
                        <Text>{moviesStore.error}</Text>
                        <Text>Попробуйте использовать ВПН</Text>
                    </>
                    :
                    (moviesStore.moviesList.length === 0
                        ?
                        <Text>Список фильмов пуст</Text>
                        :
                        <FlatList
                            data={moviesStore.moviesList}
                            numColumns={2}
                            refreshing={moviesStore.isLoading}
                            onRefresh={moviesStore.getAllMoviesAction}
                            renderItem={({ item }) =>
                                <Pressable onPress={() => navigate('Movie', { movie: item })}>
                                    <MovieCard movie={item} />
                                </Pressable>
                            }
                            ListFooterComponent={
                                <View style={styles.toolbar}>
                                    <Pressable style={styles.button} onPress={() => moviesStore.toPrevPage()}>
                                        <Text>Назад</Text>
                                    </Pressable>
                                    <Text>{moviesStore.currentPage}</Text>
                                    <Pressable style={styles.button} onPress={() => moviesStore.toNextPage()}>
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
})

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


