import React, { Component } from "react";
import {StyleSheet,View,Text,Image, TouchableOpacity, Alert} from "react-native"
import { TextInput } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import NotificationPopup from 'react-native-push-notification-popup'; 
import {getAuth, onAuthStateChanged } from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import { firebaseConfig } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const app=initializeApp(firebaseConfig)
const auth = getAuth();
const db = getFirestore(app);


class Spends extends Component{

    constructor(){
        super()

        this.state={
            spendName:'',
            spendValue:0,
            open: false,
            value: null,
            items: [{label:'Baja',value:'Baja'},
                    {label:'Alta',value:'Alta'},]
        }
    }

    changeSpendName(spendName){
        this.setState({spendName})
    }

    changeSpendValue(spendValue){
        this.setState({spendValue})
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

        const {spendName,spendValue,open,value,items}=this.state
        return(
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>Gastos</Text>
                </View>
                <View style={styles.container}>

                    <Image 
                        style={styles.image}
                        source={require('../../assets/Hormiga2.png')}
                    />

                    <TextInput
                        style={styles.input}
                        value={this.state.spendName}
                        onChangeText={(spendName)=>this.changeSpendName(spendName)}
                        right={<TextInput.Icon icon={"piggy-bank"} iconColor='#e55039' />}
                        label="Nombre del producto"
                        mode="outlined"
                        placeholder="Arriendo"
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
                        value={this.state.spendValue}
                        onChangeText={(spendValue)=>this.changeSpendValue(spendValue)}
                        right={<TextInput.Icon icon={"currency-usd"} iconColor='#e55039' />}
                        label="Gasto"
                        mode="outlined"
                        placeholder="$$$$$$$"
                        placeholderTextColor="gray"
                        outlineColor="gray"
                        activeOutlineColor="#e55039"
                        keyboardType="phone-pad"
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
                        placeholder='Prioridad'
                        placeholderStyle={{
                            color: "grey",
                            fontSize:18,
                            fontFamily:'Sansation_light'
                            
                        }}
                        style={styles.select}
                        listMode="FLATLIST"
                        arrowIconStyle={{
                            backgroundColor:'#e55039',
                        }}
                        dropDownContainerStyle={{
                            padding:4,
                            width:'50%',
                            alignSelf:'flex-end',
                            
                        }}
                        
                    />

                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={()=>{
                            var today=new Date();
                            if(spendName!=0){
                                if(spendValue>=50){
                                    if(value!=null){
                                        onAuthStateChanged(auth, (user)=>{
                                            if(user){
                                                try {
                                                    const docRef = addDoc(collection(db, "Users",user.uid,'Spend_Data'), {
                                                        Spend_Name:spendName,
                                                        Spend_Value:spendValue,
                                                        Priority:value
                                                    });
                                                    this.changeSpendName('')
                                                    this.changeSpendValue('')

                                                    this.popup.show({
                                                        appTitle: 'Antpire',
                                                        timeText: today.toLocaleString(),
                                                        title: 'Felicidades',
                                                        body: "Tu gasto se registró de forma correcta.",
                                                        slideOutTime: 3000.
                                                    })
                                                    
                                           
                                                } catch (e) {
                                                    this.popup.show({
                                                        appTitle: 'Antpire',
                                                        timeText: today.toLocaleString(),
                                                        title: 'Error',
                                                        body: "No se pudo agregar tu gasto..",
                                                        slideOutTime: 3000.
                                                    })
                                                }
                                            }
                                        })
                                    }
                                    else{
                                        this.popup.show({
                                            appTitle: 'Antpire',
                                            timeText: today.toLocaleString(),
                                            title: 'Error',
                                            body: "Debes seleccionar la prioridad del gasto.",
                                            slideOutTime: 3000.
                                        })

                                    }

                                }
                                else{
                                    this.popup.show({
                                        appTitle: 'Antpire',
                                        timeText: today.toLocaleString(),
                                        title: 'Error',
                                        body: "El precio que ingresaste es inválido.",
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
                        <Text style={styles.txt}>Registrar</Text>
                    </TouchableOpacity>

                </View>
                <NotificationPopup 
                    ref={ref => this.popup = ref} 
                />
    
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
        alignSelf:'center',
        alignContent:'center',
        alignItems:'center',
        width:'90%',
        height:'83%',
        marginTop:51,
        borderWidth:2,
        borderColor:'#a4b0be',
        borderRadius:10

    },
    image: {
        marginTop:5,
        width:250,
        height:250,
    },
    input: {
        padding:1,
        marginTop:20,
        width:'90%',
        alignSelf:'center',
        fontSize:18,
        fontFamily:'Sansation_light'
    },
    select:{
        width:'90%',
        alignSelf:'center',
        marginTop:25,
        borderRadius:25,
        borderColor:"gray",
        padding:1,
        fontSize:18
    },
    btn:{
        marginTop:25,
        backgroundColor:'#e55039',
        borderRadius:25,
        borderWidth:1,
        borderColor:'black',
        width:100,
        alignItems:'center'
    },
    txt: {
        color:'white',
        padding:10,
        fontSize:16,
        fontFamily:'Sansation_bold'
    }
})

export default Spends;