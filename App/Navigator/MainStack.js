import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import HomePage from '../Views/HomePage';
import RegisterPage from '../Views/RegisterPage';
import LoginPage from '../Views/LoginPage';
import RecoveryPage from '../Views/RecoveryPage';
import Home from '../Views/Home';

const Stack=createNativeStackNavigator()

function MainStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown:false
                }}
            >
                <Stack.Screen
                    name='HomePage'
                    component={HomePage}
                />
                <Stack.Screen
                    name='RegisterPage'
                    component={RegisterPage}
                />
                <Stack.Screen
                    name='LoginPage'
                    component={LoginPage}
                />
                <Stack.Screen
                    name='RecoveryPage'
                    component={RecoveryPage}
                />
                <Stack.Screen
                    name='Home'
                    component={Home}
                />



            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainStack;
