import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { TAppNav } from '../types';
import { MovieCard } from '../components/MovieCard';

//* Display list of movies 
export function MoviesListScreen() {
    //TODO add filters
    const { navigate } = useNavigation<NavigationProp<TAppNav>>();
    //TODO change to real data
    const movies = [
        {
            id: 0,
            image: 'asd',
            title: 'Человек паук 1',
            date: '07/07/23'
        },
        {
            id: 1,
            image: 'asd',
            title: 'Человек паук 2',
            date: '07/07/23'
        },
        {
            id: 2,
            image: 'asd',
            title: 'Человек паук 3',
            date: '07/07/23'
        },
        {
            id: 3,
            image: 'asd',
            title: 'Человек паук 4',
            date: '07/07/23'
        },
    ]

    return (
        <View>
            <Text>MoviesListScreen</Text>
            <FlatList
                data={movies}
                numColumns={2}
                renderItem={({ item }) =>
                    <Pressable onPress={() => navigate('Movie', { movie: item })}>
                        <MovieCard movie={item} />
                    </Pressable>
                }
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
})


