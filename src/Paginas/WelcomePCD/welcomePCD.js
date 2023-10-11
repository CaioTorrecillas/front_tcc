import React from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable'




const WelcomePCD = () =>{
    

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor= "white" barStyle="light-content"/>

        <View style={styles.containerLogo}>
            
        <Animatable.Image
        animation='flipInY'
       
        style={{width: '100%', height: 415, borderRadius: 100}}
        resizemode="contain"/>
        
        </View>
        
        <Animatable.View delay={600} animation='fadeInUp' style={styles.containerForm}>
        <View style={styles.containerForm}>
        <Text style={styles.blind}>Usuario PCD</Text>
    
        <TextInput
          style={styles.input}
          placeholder="Onde esta? "
         
        />
        <TextInput
          style={styles.input}
          placeholder="Onde vamos? "
        />
        <TouchableOpacity 
        style={styles.button1}
        >
            <Text style={styles.buttonText}>Ver Jornadas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.button2}
        >
            <Text style={styles.buttonText}>Mandar Jornada</Text>
        </TouchableOpacity>
        </View>
        </Animatable.View>
    </View>
        

  );
}
    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor: 'white'
        },
        containerLogo:{
            flex:2,
            backgroundColor: 'white',
            justifyContent:'center',
            alignItems:'center'
        },
        containerForm:{
            flex:3, 
            backgroundColor: '#FFF',
            paddingStart: '5%',
            paddingEnd: '5%'
        },
        tittle:{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 12,
            color: 'black',
            alignItems:'center',
            alignSelf: 'center'
        },
        text:{
            color: 'black',
            alignItems:'center',
            alignSelf: 'center',
            marginTop: 220,
        },
        button1:{
            position: 'absolute',
            backgroundColor: 'black',
            borderRadius: 50,
            paddingVertical: 8,
            width: '60%',
            alignSelf: 'center',
            bottom:'15%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        button2:{
          position: 'absolute',
          backgroundColor: 'black',
          borderRadius: 50,
          paddingVertical: 8,
          width: '60%',
          alignSelf: 'center',
          bottom:'5%',
          alignItems: 'center',
          justifyContent: 'center'
      },
        buttonText:{
            fontSize: 18,
            color: '#FFF'
        },
        blind:{
          fontSize: 30,
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: 12,
            color: 'black',
            alignItems:'center',
            alignSelf: 'center'
        },
        input: {
            width: '100%',
            height: 40,
            borderColor: 'black',
            borderWidth: 1,
            marginBottom: 16,
            paddingLeft: 8,
          },
    })
export default WelcomePCD;