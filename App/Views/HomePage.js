import React from 'react';
import {StyleSheet,View,Text,Image, TouchableOpacity} from 'react-native';
import {useFonts} from 'expo-font';

function HomePage({navigation}){
    
    const [fontsLoaded]=useFonts({
        Sansation_light:require("../../assets/fonts/Sansation_Light.ttf"),
        Sansation_bold:require("../../assets/fonts/Sansation_Bold.ttf"),
        Sansation_regular:require("../../assets/fonts/Sansation_Regular.ttf")
    });

    if(!fontsLoaded){
    }
    else{
        return(
            <View style={styles.container}>
    
                <Image
                    style={styles.antImage}
                    source={require('../../assets/Hormiga.png')}
                />
    
                <Text style={styles.title}>Antpire</Text>
    
                <View style={styles.line}></View>
    
                <Text style={styles.text}>¡Queremos ayudarte con tus finanzas personales!</Text>
    
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{
                        navigation.navigate('RegisterPage')
                    }}
                > 
                    <Text style={styles.txt}>Comienza ahora</Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    style={styles.btn2}
                    onPress={()=>{
                        navigation.navigate('LoginPage')
                    }}
                > 
                    <Text style={styles.txt2}>Ya tengo una cuenta</Text>
                </TouchableOpacity>
                    
            </View>
        
        );
    }

 

}


const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center'
    },
    
    antImage:{
        height:350,
        width:320,
        marginTop:6
    },

    title:{
        fontSize:60,
        color:'#e55039',
        fontFamily:'Sansation_regular'
        
    },

    line:{
        backgroundColor:'black',
        marginTop:40,
        height:1,
        width:"90%"
    },

    text:{
        marginTop:30,
        fontSize:18,
        fontFamily:'Sansation_light'
        
    },

    btn:{
        marginTop:30,
        backgroundColor:'#e55039',
        borderRadius:25,
        borderWidth:1,
        borderColor:'black',
    },

    txt:{
        color:'white',
        padding:13,
        fontSize:18,
        fontFamily:'Sansation_bold'
    },

    btn2:{
        marginTop:5,
    },

    txt2:{
        color:'black',
        padding:13,
        fontSize:17,
        fontWeight:'bold',
        fontFamily:'Sansation_bold'
    }

});

export default HomePage;