import React, { Component } from "react";
import {StyleSheet,View,Text, TouchableOpacity, Alert} from "react-native"
import {getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import { firebaseConfig } from "../../firebase-config";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const app=initializeApp(firebaseConfig)
const auth = getAuth();
const db = getFirestore(app);


var name,email,salary,frequencySalary

onAuthStateChanged(auth, (user) => {
    if (user) {

        const uid = user.uid;

        getDocs(collection(db, "Users",user.uid,'Private_Data')).then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                
                name=doc.data().Names+' '+doc.data().Last_Names
                email=doc.data().Email
                salary=doc.data().Salary
                frequencySalary=doc.data().Frequency_salary
            });
        })
    } 
    else {

    }
});




class Profile extends Component{
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View>

                <View style={styles.header}>
                    <Text style={styles.title}>Cuenta</Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.subtitle}>Datos personales</Text>
                    <View>
                        <View style={styles.box}>
                            <Text style={styles.txt1}>Nombre</Text>
                            <Text style={styles.txt2}>{name}</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.txt1}>Correo</Text>
                            <Text style={styles.txt2}>{email}</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.txt1}>Contraseña</Text>
                            <Text style={styles.txt2}>**********</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.subtitle}>Datos financieros</Text>
                    <View>
                        <View style={styles.box}>
                            <Text style={styles.txt1}>Sueldo</Text>
                            <Text style={styles.txt2}>{salary}</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.txt1}>Frecuencia</Text>
                            <Text style={styles.txt2}>{frequencySalary}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container2}>
                    <View>
                        <View style={styles.box2}>
                            <TouchableOpacity style={styles.btn1}>
                                <Text 
                                    style={styles.txt}
                                    onPress={()=>{
                                        logOut()
                                    }}                                
                                >Cerrar sesión</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn2}>
                                <Text style={styles.txt}>Eliminar Cuenta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
    
            </View>
        )
        function logOut(){
            const auth = getAuth();
            signOut(auth).then(() => {
                Alert.alert(
                    'Alerta',
                    '¿Seguro quieres cerrar sesión?',
                    [
                      {
                        text: 'Sí',
                        onPress: () => navigate('HomePage'),
                        style: 'cancel',
                      },
                      {
                        text:'No',
                        cancelable: true,
                      },

                    ],

                  );
                
            }).catch((error) => {
              // An error happened.
            });
        }
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
        alignSelf:'center',
        marginTop:90,
        width:'90%',
        borderWidth:1,
        borderColor:'#a4b0be',
        borderRadius:10,
        padding:15
    },
    subtitle: {
        marginTop:-40,
        fontFamily:'Sansation_regular',
        color:'gray',
        fontSize:15
    },
    box: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        padding:15,
        borderBottomColor:'#a4b0be' 
    },
    txt1: {
        fontFamily:'Sansation_bold',
        fontSize:17
    },

    txt2: {
        fontFamily:'Sansation_regular',
        fontSize:15
    },

    box2: {
        marginTop:30,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        left:25
    },

    btn1:{
        marginTop:30,
        backgroundColor:'gray',
        borderRadius:15,
        borderWidth:1,
        borderColor:'black',
        alignItems:'center',
        width:'33%',
        right:25
    },


    btn2:{
        marginTop:30,
        backgroundColor:'#e55039',
        borderRadius:15,
        borderWidth:1,
        borderColor:'black',
        alignItems:'center',
        width:'33%'
    },

    txt: {
        color:'white',
        padding:10,
        fontSize:15,
        fontFamily:'Sansation_regular'
    }

})

export default Profile;