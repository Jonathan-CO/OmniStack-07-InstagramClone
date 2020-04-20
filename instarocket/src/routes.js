import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from './pages/Feed';
import New from './pages/New';
import { Image, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png'
import camera from './assets/camera.png'

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{
                headerTitle: <Image source={logo} />,
                headerTintColor: '#000',
                //headerStyle:{height:80, padding:15, backgroundColor:'red'},
                headerTitleAlign: "center",
                mode: 'modal'

            }}>
                <Stack.Screen
                    name="Feed"
                    component={Feed}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <TouchableOpacity
                                style={{ marginRight: 20 }}
                                onPress={() => { navigation.navigate('New') }}>
                                <Image source={camera} />
                            </TouchableOpacity>
                        )
                    })} />
                <Stack.Screen 
                    name="New" 
                    component={New} 
                    options={()=>({
                        headerTitle: "Nova Publicação"
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}