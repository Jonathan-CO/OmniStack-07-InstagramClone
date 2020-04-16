import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from './pages/Feed';
import New from './pages/New';
// import Add_Circle from './assets/add_circle.png'

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ 
                    headerTitle: 'InstaRocket',
                   // headerShown: false 
                }}>
                <Stack.Screen name="Feed" component={Feed} />
                <Stack.Screen name="New" component={New} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}