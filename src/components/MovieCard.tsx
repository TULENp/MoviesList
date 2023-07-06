import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { TMovie } from '../types'
import { postersURL } from '../services/api'

//* display movie poster, title, date and rating
export function MovieCard({ movie }: { movie: TMovie }) {
    return (
        <View style={styles.card}>
            <Image style={styles.poster} source={{ uri: postersURL + movie.poster_path }} />
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.text}>
                <Text style={styles.date}>{movie.release_date}</Text>
                <Text style={styles.date}>{movie.vote_average}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 5,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: Dimensions.get('window').width / 2 - 16,
        minWidth: Dimensions.get('window').width / 2 - 16,
    },
    text: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    poster: {
        width: '90%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        overflow: 'hidden',
    },
    date: {
        fontSize: 14,
        color: '#888888',
    },
});
