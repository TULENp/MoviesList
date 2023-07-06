import { View, Text, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { TAppNav, TMovieInfo } from '../types';
import { GetMovieById, postersURL } from '../services/api';

//* Display all info about movie
export function MovieScreen() {
    const { id, title } = useRoute<RouteProp<TAppNav, 'Movie'>>().params.movie; // get movie data from route params
    const { setOptions } = useNavigation<NavigationProp<TAppNav>>();

    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [movieData, setMovieData] = useState<TMovieInfo>();

    useEffect(() => {
        getMovie(id);
        setOptions({ title: title }); // update navigation header title to movie title
    }, [])

    async function getMovie(id: number) {
        setIsLoading(true);

        const res = await GetMovieById(id);
        // if result has an id, we consider it successfully returned a movie
        res.id ? setMovieData(res) : setError(res);

        setIsLoading(false);
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {isLoading
                ?
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
                    (!movieData
                        ?
                        <Text>Фильм не найден</Text>
                        :
                        <View style={styles.container}>
                            <Image
                                source={{ uri: postersURL + movieData.poster_path }}
                                style={styles.poster}
                            />
                            <View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.title}>{movieData.title}</Text>
                                    <Text style={[styles.rating, { fontSize: 16 }]}>{movieData.original_title}</Text>
                                    <Text style={styles.rating}>
                                        {movieData.vote_average.toFixed(1)} {" "}
                                        <Text style={styles.nameText}>(оценок: {movieData.vote_count})</Text>
                                    </Text>
                                </View>

                                <View style={styles.textContainer}>
                                    <Text style={styles.nameText}>Дата выхода</Text>
                                    <Text style={styles.valueText}>{movieData.release_date}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.nameText}>Бюджет: </Text>
                                    <Text style={styles.valueText}>$ {movieData.budget.toLocaleString('ru')}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.nameText}>Слоган: </Text>
                                    <Text style={styles.valueText}>{movieData.tagline}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.nameText}>Время: </Text>
                                    <Text style={styles.valueText}>{movieData.runtime} мин.</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.nameText}>Жанры: </Text>
                                    <Text style={styles.valueText}>{movieData.genres.map((genre) => genre.name).join(', ')}</Text>
                                </View>

                                <Text style={styles.overview}>{movieData.overview}</Text>
                            </View>
                        </View>
                    ))
            }
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,

    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    poster: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        overflow: 'hidden',
    },
    nameText: {
        fontSize: 16,
        color: '#888888',
    },
    valueText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    rating: {
        fontSize: 20,
        color: '#888888',
    },
    overview: {
        fontSize: 16,
        marginTop: 10,
    }
});
