import React from "react";
import {StyleSheet,View,Text, ScrollView, TouchableOpacity} from "react-native"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spends from "./Spends";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Reports from "./Reports";

const Tab = createMaterialBottomTabNavigator();

function HomeView(){
    return(
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Inicio</Text>
            </View>

            <ScrollView></ScrollView> 

        </View>
    )
}


function Home(){       
    return(

        <Tab.Navigator
            barStyle={{backgroundColor:'#e55039', height:60 }}
            activeColor="black"
            inactiveColor="white"
            initialRouteName="Inicio"
        >

            <Tab.Screen 
                name="Gastos" 
                component={Spends}
                options={{
                    title:'',
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="cash-multiple" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Reportes" 
                component={Reports}
                options={{
                    title:'',
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="google-analytics" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Inicio" 
                component={HomeView}
                options={{
                    title:'',
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Notificación" 
                component={Notifications}
                options={{
                    title:'',
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="bell" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen 
                name="Cuenta" 
                component={Profile}
                options={{
                    title:'',
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    ),
                }}
                
            />

        </Tab.Navigator>  


    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        top: 30,
        backgroundColor: '#e55039',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 35,
        color: 'white',
        fontFamily:'Sansation_regular'
    }
})

export default Home;
