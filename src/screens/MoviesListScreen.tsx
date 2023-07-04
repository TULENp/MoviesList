import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { TAppNav } from '../types';

export function MoviesListScreen() {

    const { navigate } = useNavigation<NavigationProp<TAppNav>>();

    return (
        <View>
            <Text>MoviesListScreen</Text>
            <Pressable onPress={() => navigate('Movie')}>
                <Text>to movie</Text>
            </Pressable>
        </View>
    )
}