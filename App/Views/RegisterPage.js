import React, { Component } from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, Image, View, Alert} from 'react-native'
import { TextInput} from "react-native-paper";
import { Icon } from '@rneui/themed';
import {useFonts} from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker';
import NotificationPopup from 'react-native-push-notification-popup'; 
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import { firebaseConfig } from "../../firebase-config";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";


const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const db = getFirestore(app);

function fonts(){
    const [fontsLoaded]=useFonts({
        Sansation_light:require("../../assets/fonts/Sansation_Light.ttf"),
        Sansation_bold:require("../../assets/fonts/Sansation_Bold.ttf"),
        Sansation_regular:require("../../assets/fonts/Sansation_Regular.ttf")
    });
}


class RegisterPage extends Component{

    constructor(){
        super();

        this.state={
            names:'',
            lastNames:'',
            age:0,
            email:'',
            salary:0.0,
            password:'',
            confirmPassword:'',
            open: false,
            value: null,
            items: [{label:'Semanal',value:'Semanal'},
                    {label:'Quincenal',value:'Quincenal'},{label:'Mensual',value:'Mensual'}]

        };

        
        
    }

    changeNames(names){
        this.setState({names})
    }

    changeLastNames(lastNames){
        this.setState({lastNames})
    }

    changeAge(age){
        this.setState({age})
    }

    changeEmail(email){
        this.setState({email})
    }

    changeSalary(salary){
        this.setState({salary})
    }

    changePassword(password){
        this.setState({password})
    }

    changeConfirmPassword(confirmPassword){
        this.setState({confirmPassword})
    }

    setOpen(open) {
        this.setState({
          open
        });
    }
    
    setValue(callback) {
        this.setState(state => ({
          value: callback(state.value)
        }));
    }
    
    setItems(callback) {
        this.setState(state => ({
          items: callback(state.items)
        }));
    }

    render(){
        const { names, lastNames, age, email, salary, 
            password, confirmPassword, open, value, items } = this.state;
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

    
                
                <Text style={styles.title}>¡Empecemos!</Text>
    
                <Image
                    style={styles.img}
                    source={require('../../assets/Hormiga2.png')}
                />
    
                <TextInput
                    style={styles.input}
                    value={this.state.names}
                    onChangeText={(names)=>this.changeNames(names)}
                    right={<TextInput.Icon icon={"face-man-shimmer-outline"} iconColor='#e55039' />}
                    label="Nombres"
                    mode="outlined"
                    placeholder="Igrese su(s) nombre(s)"
                    placeholderTextColor="gray"
                    outlineColor="gray"
                    activeOutlineColor="#e55039"
                    focusable='true'
                    theme={{roundness:25, colors:{onSurfaceVariant:'gray'}, font:{fontWeight:'bold'} }} 
                    contentStyle={{
                        fontFamily:'Sansation_light'
                    }}
                    
                />

                <TextInput
                    style={styles.input}
                    value={this.state.lastNames}
                    onChangeText={(lastNames)=>this.changeLastNames(lastNames)}
                    right={<TextInput.Icon icon={"face-woman-shimmer-outline"} iconColor='#e55039' />}
                    label="Apellidos"
                    mode="outlined"
                    placeholder="Igrese su(s) apellido(s)"
                    placeholderTextColor="gray"
                    outlineColor="gray"
                    activeOutlineColor="#e55039"
                    theme={{roundness:25, colors:{onSurfaceVariant:'gray'} }}
                    contentStyle={{
                        fontFamily:'Sansation_light'
                    }}  
                />

                <TextInput
                    style={styles.input}
                    value={this.state.age}
                    onChangeText={(age)=>this.changeAge(age)}
                    right={<TextInput.Icon icon={"numeric"} iconColor='#e55039' />}
                    label="Edad"
                    mode="outlined"
                    placeholder="Igrese su edad"
                    placeholderTextColor="gray"
                    outlineColor="gray"
                    activeOutlineColor="#e55039"
                    keyboardType="phone-pad"
                    theme={{roundness:25, colors:{onSurfaceVariant:'gray'} }}
                    contentStyle={{
                        fontFamily:'Sansation_light'
                    }}
                />

                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={(email)=>this.changeEmail(email)}
                    right={<TextInput.Icon icon={"email"} iconColor='#e55039' />}
                    label="Email"
                    mode="outlined"
                    placeholder="user@example.com"
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
                    value={this.state.salary}
                    onChangeText={(salary)=>this.changeSalary(salary)}
                    right={<TextInput.Icon icon={"cash-multiple"} iconColor='#e55039' />}
                    label="Sueldo"
                    mode="outlined"
                    placeholder="Ingrese la suma de su sueldo"
                    placeholderTextColor="gray"
                    outlineColor="gray"
                    activeOutlineColor="#e55039"
                    keyboardType="phone-pad"
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
                    placeholder="Más de 6 caracteres"
                    placeholderTextColor="gray"
                    outlineColor="gray"
                    activeOutlineColor="#e55039"
                    theme={{roundness:25, colors:{onSurfaceVariant:'gray'} }}
                    contentStyle={{
                        fontFamily:'Sansation_light'
                    }}
                />

                <TextInput
                    style={styles.input}
                    value={this.state.confirmPassword}
                    onChangeText={(confirmPassword)=>this.changeConfirmPassword(confirmPassword)}
                    right={<TextInput.Icon icon={"form-textbox-password"} iconColor='#e55039' />}
                    secureTextEntry={true}
                    label="Confirmar contraseña"
                    mode="outlined"
                    placeholder="Confirme su contraseña"
                    placeholderTextColor="gray"
                    outlineColor="gray"
                    activeOutlineColor="#e55039"
                    theme={{roundness:25, colors:{onSurfaceVariant:'gray'} }}
                    contentStyle={{
                        fontFamily:'Sansation_light'
                    }}

                    
                    
                />

                <DropDownPicker

                    open={open}
                    value={value}
                    items={items}
                    setOpen={(open)=>this.setOpen(open)}
                    setValue={(value)=>this.setValue(value)}
                    setItems={(items)=>this.setItems(items)}
                    placeholder='Frecuencia de pago'
                    placeholderStyle={{
                        color: "grey",
                        fontSize:18,
                        fontFamily:'Sansation_light'
                        
                    }}
                    style={styles.select}
                    listMode="SCROLLVIEW"
                    arrowIconStyle={{
                        backgroundColor:'#e55039',
                    }}
                    dropDownContainerStyle={{
                        padding:4,
                        width:'50%',
                        alignSelf:'center',
                        
                    }}
                    
                />
                    
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={()=>{
                        var today=new Date()
                        
                        if(names.length!=0 && lastNames.length!=0 && email.length!=0 && password.length!=0
                            && confirmPassword.length!=0){
                            if(age>=18){
                                if(salary>=20000){
                                    if(value!=null){
                                        if(password==confirmPassword){
                                            createUserWithEmailAndPassword(auth, email, password)
                                            .then((userCredential) => {
                                                const user = userCredential.user;
                                                try {
                                                    navigate('LoginPage')
                                                    const docRef = addDoc(collection(db, "Users",user.uid,'Private_Data'), {
                                                        Names:names,
                                                        Last_Names:lastNames,
                                                        Age:age,
                                                        Email:email,
                                                        Salary:salary,
                                                        Frequency_salary:value
                                                    });
                                           
                                                } catch (e) {
                                                    Alert.alert("Error", "adding document: "+ e);
                                                }
           
                                                 Alert.alert("Felicidades", "Te has registrado de forma correcta.") 
                   
                                            })
                                           .catch((error) => {
                                               const errorCode = error.code;
                                               const errorMessage = error.message;
                                            
                                               this.popup.show({
                                                    appTitle: 'Antpire',
                                                    timeText: today.toLocaleString(),
                                                    title: 'Error',
                                                    body: errorMessage,
                                                    slideOutTime: 3000.
                                                })
                                           })
                                        }
                                        else{
                                            this.popup.show({
                                                appTitle: 'Antpire',
                                                timeText: today.toLocaleString(),
                                                title: 'Error',
                                                body: "Las contraseñas no coinciden.",
                                                slideOutTime: 3000.
                                            })
                                        } 
                                    }
                                    else{
                                        this.popup.show({
                                            appTitle: 'Antpire',
                                            timeText: today.toLocaleString(),
                                            title: 'Error',
                                            body: "Debes seleccionar la frecuencia de pago.",
                                            slideOutTime: 3000.
                                        })
                                    }
           
                                }
                                else{
                                    this.popup.show({
                                        appTitle: 'Antpire',
                                        timeText: today.toLocaleString(),
                                        title: 'Error',
                                        body: "El sueldo que ingresaste no es válido.",
                                        slideOutTime: 3000.
                                    })
                                }
                            }
                            else{
                                this.popup.show({
                                    appTitle: 'Antpire',
                                    timeText: today.toLocaleString(),
                                    title: 'Error',
                                    body: "la edad que ingresaste no es válida.",
                                    slideOutTime: 3000.
                                })
                            }
                        }
                        else{
                            this.popup.show({
                                appTitle: 'Antpire',
                                timeText: today.toLocaleString(),
                                title: 'Error',
                                body: "Debes llenar todos los campos.",
                                slideOutTime: 3000.
                            })
                        }
                    }}
                >
                <View style={styles.notification}>
                    <NotificationPopup 
                        ref={ref => this.popup = ref}  
                    /> 
                </View>
                    <Text style={styles.txt}>Continuar</Text>
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
        fontFamily:'Sansation_light',
        
    },

    select:{
        width:'90%',
        alignSelf:'center',
        marginTop:20,
        borderRadius:25,
        borderColor:"gray",
        padding:1,
        fontSize:18
        
    },

    btn:{
        marginTop:30,
        marginBottom:50,
        backgroundColor:'#e55039',
        borderRadius:25,
        borderWidth:1,
        borderColor:'black',
        width:111,
        alignSelf:'center'
    },

    txt:{
        color:'white',
        padding:13,
        fontSize:18,
        fontFamily:'Sansation_bold'
    },

    notification:{
        alignContent:'center',
        top:-60,
        right:150,

    }
})

export default RegisterPage;