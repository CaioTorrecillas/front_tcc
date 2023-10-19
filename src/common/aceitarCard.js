import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api, { aceitarJornadaService, buscarJornadasService, notificarPCDService } from '../hook/api'


const AceitarCard = (props) => {


    function onOpened(result){
        console.log("Mensagem", result.notification.payload.body)
        console.log('Resultado: ',result)
    }
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [aceitar, setAceitar] = useState(0);
    const { data } = props;   
    const { id_usuario } = props; 
    const { id_jornada } = props;   
    const { name } = props;
    const { name_aux } = props;
    
    const {telefone } = props;


    console.log("Entrando no card de aceitar")
    console.log(data)
    console.log(id_usuario)
    console.log(id_jornada)
    console.log(name)
    const handleButtonPress = async () => {
        
        setAceitar(1)
        console.log(aceitar)
        console.log(id_usuario, id_jornada, aceitar, message, name_aux, telefone)
        if(aceitar == 1){
            await buscarJornadasService();
    
            await aceitarJornadaService(id_usuario, id_jornada, aceitar, message, name_aux, telefone)
            .then((response) => {
                console.log(response)
               
            })
            await notificarPCDService(id_usuario);
        }
       
    };

    return (
        <View style={styles.container}>
            <Text>Viagem do {name} </Text>
            <TextInput
                style={styles.messageInput}
                placeholder="Digite sua mensagem para a pessoa PCD"
                value={message}
                onChangeText={(text) => setMessage(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>Aceitar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', // Alinhe o conteúdo no centro
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
    },
    messageInput: {
        height: 90, // Reduzir a altura do TextInput
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: 200,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end', // Alinhe o botão no canto direito
    },
    buttonText: {
        color: 'white',
    },
});

export default AceitarCard;
