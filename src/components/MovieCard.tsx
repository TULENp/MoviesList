import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { TMovie } from '../types'
import { postersURL } from '../services/api'

//* display movie poster, title and date
export function MovieCard({ movie }: { movie: TMovie }) {
    //TODO change source to uri 
    return (
        <View style={styles.card}>
            <Image style={styles.poster} source={{ uri: postersURL + movie.poster_path }} />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.date}>{movie.release_date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        alignItems: 'center',
    },
    poster: {
        width: Dimensions.get('window').width / 2 - 48,
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: '#888888',
    },
})


