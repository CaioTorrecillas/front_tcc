import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JornadaCard = (props) => {
    const navigation = useNavigation(); // Usando useNavigation

    const { data } = props;
    console.log(data)
    const navegarParaMapa = () => {
        navigation.navigate('MapaAux', {jornadaData: data});
    }

    return (
        <TouchableOpacity style={styles.container}>
            <Text>Jornada de {data.usuario.name}</Text>
            <Text>Onde estou?: {data.cep_origem},{data.numero_origem} </Text>
            <Text>Meu Destino: {data.cep_destino}, {data.numero_destino} </Text>
            <Text style={styles.descricao}>
                Mensagem do Pcd: {data.desc_pcd}
            </Text>
            <TouchableOpacity
                onPress={navegarParaMapa}
                style={styles.aceitarButton}>
                <Text style={styles.buttonTxt}>Ver</Text>
                
            </TouchableOpacity>
            <TouchableOpacity

                style={styles.aceitarButton}>
                <Text style={styles.buttonTxt}>Aceitar?</Text>
                
            </TouchableOpacity>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

    container:{
        width: 250,
        padding: 24,
        borderRadius: 16,
        borderColor:'black',
        borderWidth: 2,
        justifyContent: "space-between",
        shadowColor: "#F3F4F8",
      },
    descricao: {
        fontSize: 14,
        flexWrap: 'wrap',
    },
    usuarioPCDNome: ({
        fontSize: 12,
        fontFamily: "DMRegular",
        fontWeight: 'bold',

    }),
    searchBtn: {
       
      },
    aceitarButton: {
        width: 70,
        height: "15%",
        backgroundColor: 'orange',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    infoContainer: {
        marginTop: 20,
    },
    origem: {
        fontSize: 12,
        fontFamily: "DMRegular",
        color: "#f7021f",
    },
    destino: {
        fontSize: 12,
        fontFamily: "DMRegular",
        color: "#f7021f",
    }

});
export default JornadaCard;