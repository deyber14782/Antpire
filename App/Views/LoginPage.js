import React, { Component } from "react";
import {StyleSheet, View, Text, Image, ScrollView, TouchableOpacity} from "react-native";
import { Icon } from '@rneui/themed';
import { TextInput } from "react-native-paper";
import NotificationPopup from 'react-native-push-notification-popup';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import { firebaseConfig } from "../../firebase-config";

const app=initializeApp(firebaseConfig)
const auth = getAuth();

class LoginPage extends Component{

    constructor(){
        super()

        this.state={
            password:'',
            email:''
        }
    }

    changeEmail(email){
        this.setState({email})
    }

    changePassword(password){
        this.setState({password})
    }

    render(){

        const{ email,password }=this.state;
        const {navigate} = this.props.navigation;
        
        return(
            <ScrollView style={styles.container}>
                <View style={styles.back}>
                    <Icon
                        reverse
                        name="arrow-left"
                        type='font-awesome'
                        color='#f50'
                        onPress={() =>{
                            this.props.navigation.navigate('HomePage')
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

                <Text style={styles.title}>Bienvenido</Text>
 
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

                <TextInput
                    style={styles.input}
                    value={this.state.password}
                    onChangeText={(password)=>this.changePassword(password)}
                    right={<TextInput.Icon icon={"lock"} iconColor='#e55039' />}
                    secureTextEntry={true}
                    label="Contraseña"
                    mode="outlined"
                    placeholder="Contraseña"
                    placeholderTextColor="gray"
                    outlineColor="gray"
                    activeOutlineColor="#e55039"
                    theme={{roundness:25, colors:{onSurfaceVariant:'gray'} }}
                    contentStyle={{
                        fontFamily:'Sansation_light'
                    }}
                    
                />
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={()=>{
                        var today=new Date()

                        if(password.length!=0 && email.length!=0){
                            signInWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                              const user = userCredential.user;
                              navigate('Home');
                              
                            })
                            .catch((error) => {
                                this.popup.show({
                                    appTitle: 'Antpire',
                                    timeText: today.toLocaleString(),
                                    title: 'Error',
                                    body: 'El correo o la contraseña son incorrectos.',
                                    slideOutTime: 3000.
                                })
                            });
                        }
                        else{
                            this.popup.show({
                                appTitle: 'Antpire',
                                timeText: today.toLocaleString(),
                                title: 'Error',
                                body: 'Debes llenar todos los campos.',
                                slideOutTime: 3000.
                            })
                        }

                    }}
                >
                    <Text style={styles.txt}>Iniciar sesión</Text>
                </TouchableOpacity> 
                <TouchableOpacity 
                    style={styles.btn2}
                    onPress={()=>{
                        this.props.navigation.navigate('RecoveryPage')
                    }}
                >
                    <Text 
                        style={styles.txt2}>¿Olvidaste tu contraseña?
                    </Text>
                </TouchableOpacity> 


            </ScrollView>
            
        )
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
        fontSize:40,
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
        marginTop:15,
        width:'90%',
        alignSelf:'center',
        fontSize:18,
        fontFamily:'Sansation_light'
    },

    btn:{
        marginTop:20,
        backgroundColor:'#e55039',
        borderRadius:25,
        borderWidth:1,
        borderColor:'black',
        width:138,
        alignSelf:'center'
    },

    txt:{
        color:'white',
        padding:13,
        fontSize:18,
        fontFamily:'Sansation_bold'
    },

    btn2:{
        marginTop:20,
        marginBottom:50,
        width:138,
        alignSelf:'center'
    },

    txt2:{
        textAlign:'center',
        color:'#0984e3',
        fontSize:14,
        width:190,
        alignSelf:'center',
        fontFamily:'Sansation_regular'
    },
})

export default LoginPage;