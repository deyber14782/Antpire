import { Icon } from "@rneui/base";
import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import NotificationPopup from 'react-native-push-notification-popup';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import { firebaseConfig } from "../../firebase-config";

const app=initializeApp(firebaseConfig)
const auth = getAuth();

class RecoveryPage extends Component{
    constructor(){
        super();

        this.state={
            email:'',
        }
    }

    changeEmail(email){
        this.setState({email})
    }

    render(){

        const {email}=this.state;
        const {navigate}=this.props.navigation;
        

        return(
            <ScrollView style={styles.container}>
                <View style={styles.back}>
                    <Icon
                        reverse
                        name="arrow-left"
                        type='font-awesome'
                        color='#f50'
                        onPress={() =>{
                            this.props.navigation.navigate('LoginPage')
                        }}
                    />
                </View>
                <NotificationPopup 
                        ref={ref => this.popup = ref} 
                />
                <Image
                    style={styles.img}
                    source={require('../../assets/Hormiga2.png')}
                />

                <Text style={styles.title}>¿Se te perdió algo?</Text>

                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={(email)=>this.changeEmail(email)}
                    right={<TextInput.Icon icon={"email"} iconColor='#e55039' />}
                    label="Correo"
                    mode="outlined"
                    placeholder="Correo electrónico"
                    placeholderTextColor="gray"
                    outlineColor="gray"
                    activeOutlineColor="#e55039"
                    keyboardType="email-address"
                    theme={{roundness:25, colors:{onSurfaceVariant:'gray'} }}
                    contentStyle={{
                        fontFamily:'Sansation_light'
                    }}
                />

                <TouchableOpacity 
                    style={styles.btn}
                    onPress={()=>{
                        var today=new Date();

                        if(email!=0){
                            sendPasswordResetEmail(auth, email)
                            .then(() => {
                                this.popup.show({
                                    appTitle: 'Antpire',
                                    timeText: today.toLocaleString(),
                                    title: 'Felicidades',
                                    body: 'El mensaje de recuperación de contraseña ya fue enviado a tu correo.',
                                    slideOutTime: 5000.
                                })
                                this.changeEmail('')
            
                            })
                            .catch((error) => {
                                this.popup.show({
                                    appTitle: 'Antpire',
                                    timeText: today.toLocaleString(),
                                    title: 'Error',
                                    body: 'El correo que ingresaste no existe.',
                                    slideOutTime: 3000.
                                })
                            }); 
                        }
                        else{
                            this.popup.show({
                                appTitle: 'Antpire',
                                timeText: today.toLocaleString(),
                                title: 'Error',
                                body: 'Debes ingresar tu correo electrónico.',
                                slideOutTime: 3000.
                            })
                        }

                    }}
                >
                    <Text style={styles.txt}>Recuperar Contraseña</Text>
                </TouchableOpacity>
            </ScrollView>

        );
    }
}

const styles=StyleSheet.create({
    container:{
        alignContent:'center',
        
    },

    back:{
        marginLeft:20,
        marginTop:30,
        
    },

    title:{
        textAlign:'center',
        fontSize:35,
        marginTop:20,
        fontFamily:'Sansation_regular'
    },

    img:{
        width:380,
        height:380,
        alignSelf:'center'
    },

    input:{
        padding:1,
        marginTop:40,
        width:'90%',
        alignSelf:'center',
        fontSize:18,
        fontFamily:'Sansation_light'
    },

    btn:{
        marginTop:40,
        backgroundColor:'#e55039',
        borderRadius:25,
        borderWidth:1,
        borderColor:'black',
        width:215,
        alignSelf:'center'
    },

    txt:{
        color:'white',
        padding:13,
        fontSize:18,
        fontFamily:'Sansation_bold'
    },
})

export default RecoveryPage