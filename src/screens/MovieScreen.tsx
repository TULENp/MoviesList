import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { TAppNav, TMovie } from '../types';
import { GetMovieById, postersURL } from '../services/api';

//* Display all info about movie
export function MovieScreen() {
    const { id } = useRoute<RouteProp<TAppNav, 'Movie'>>().params.movie; // get movie data from route params
    const { setOptions } = useNavigation<NavigationProp<TAppNav>>();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [movieData, setMovieData] = useState<TMovie>();

    useEffect(() => {
        getMovie(id);
    }, [])

    async function getMovie(id: number) {
        setIsLoading(true);

        const res = await GetMovieById(id);
        // if result has an id, we consider it successfully returned a movie
        if (res.id) { 
            setMovieData(res);
            setOptions({ title: res.title }); // update navigation header title to movie title
        }
        else {
            setError(res);
        }
        setIsLoading(false);
    }


    return (
        <View style={styles.container}>
            <Image source={{ uri: postersURL + movieData?.poster_path }} style={styles.poster} />
            {/* <Text style={styles.date}>{date}</Text>
            <Text style={styles.rating}>{title}</Text>
            <Text style={styles.description}>{title.repeat(20)}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 16,
        alignItems: 'center',
    },
    poster: {
        width: 200,
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    rating: {
        fontSize: 14,
        color: '#888888',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
    },
});