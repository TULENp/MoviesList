import { View, Text } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TAppNav } from '../types';

//* Display all info about movie
export function MovieScreen() {
    const { id, image, title, date } = useRoute<RouteProp<TAppNav, 'Movie'>>().params.movie; // get movie data from route params

    return (
        <View>
            <Text>MovieScreen</Text>
            <Text>{title}</Text>
        </View>
    )
}