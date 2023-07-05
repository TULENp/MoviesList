import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MoviesListScreen } from '../screens/MoviesListScreen';
import { MovieScreen } from '../screens/MovieScreen';
import { NavigationContainer } from '@react-navigation/native';
import { TAppNav } from '../types';

const Stack = createNativeStackNavigator<TAppNav>();

export function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='List'>
                <Stack.Screen name="List" component={MoviesListScreen} options={{ title: 'Movies' }} />
                <Stack.Screen name="Movie" component={MovieScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}