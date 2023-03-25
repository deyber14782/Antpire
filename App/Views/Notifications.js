import React, { Component } from "react";
import {StyleSheet,View,Text, ScrollView} from "react-native"


class Notifications extends Component{
    render(){
        return(
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>Notificaciones</Text>
                </View>
    
                <ScrollView></ScrollView>
    
            </View>
        )
    }     

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

export default Notifications;