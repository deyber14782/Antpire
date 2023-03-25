import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"


class Reports extends Component{
    render(){
        return(
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>Reportes</Text>
                </View>

                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/Hormiga2.png')}
                    />
                    <Text style={styles.txt}>¿Cómo va todo?</Text>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.txt2}>Historial de gastos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.txt2}>Balances</Text>
                    </TouchableOpacity>
                </View>
    
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
    },
    container: {
        alignItems:'center',
        alignContent:'center'
    },
    image: {
        marginTop:60,
        width:350,
        height:350,
    },
    txt:{
        marginTop:15,
        fontFamily:'Sansation_bold',
        fontSize:40
    },
    btn:{
        marginTop:30,
        backgroundColor:'#e55039',
        borderRadius:25,
        borderWidth:1,
        borderColor:'black',
        width:'95%',
        alignItems:'center'
    },
    txt2: {
        color:'white',
        padding:10,
        fontSize:18,
        fontFamily:'Sansation_regular'
    }
})

export default Reports;