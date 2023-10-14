import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JornadaCardPCD = (props) => {
    const navigation = useNavigation(); // Usando useNavigation

    const { data } = props;
    console.log("Estou no modal aqui")
    console.log(data.data.jornadaExistente.numero_origem)

    return (
        <TouchableOpacity style={styles.container}>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Número do Destino:</Text>
                <TextInput
                    style={styles.input}
                    value={data.data.jornadaExistente.cep_destino}
                    onChangeText={(text) => {
                        // Você pode atualizar os dados conforme o usuário digita, se necessário
                    }}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Número do Destino:</Text>
                <TextInput
                    style={styles.input}
                    value={data.data.jornadaExistente.numero_destino}
                    onChangeText={(text) => {
                        // Você pode atualizar os dados conforme o usuário digita, se necessário
                    }}
                />
            </View>




            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sua mensagem:</Text>
                <TextInput
                    style={styles.input}
                    value={data.data.jornadaExistente.desc_pcd}
                    onChangeText={(text) => {
                        // Você pode atualizar os dados conforme o usuário digita, se necessário
                    }}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={[styles.label, styles.importantLabel]}>Aceito?: {data.data.jornadaExistente.aceito === 1 ? 'Sim' : 'Não'}</Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

    container: {
        width: 400,
        padding: 24,
        height: 300,
        borderRadius: 16,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 2,
        justifyContent: "space-between",
        shadowColor: "#F3F4F8",
    },
    descricao: {
        fontSize: 14,
        flexWrap: 'wrap',
    },
    input: {
        fontSize: 16,
    },
    usuarioPCDNome: ({
        fontSize: 12,
        fontFamily: "DMRegular",
        fontWeight: 'bold',

    }),
    searchBtn: {

    },
    label: {
        fontSize: 16
    },
    importantLabel: {
        fontSize: 18, 
        borderColor: 'red', 
        borderWidth: 2, 
        padding: 4, 
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
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
export default JornadaCardPCD;