import React,  { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'


const JornadaCard = ({ item }) => {
    const [aceitou, setAceitou] = useState(false);

    const handleAcao = () => {
        setAceitou(true);
        if(aceitou){
            alert('Login bem-sucedido!')
        }
    }

    return (
        <TouchableOpacity>
            <Text
                style={styles.usuarioPCDNome}
                numberOfLines={1}>{item.nomePCD}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.origem}>
                    {item.origem}
                </Text>
                <Text style={styles.destino}>
                    {item.destino}
                </Text>
            </View>
            <TouchableOpacity onPress={() => {
                 handleAcao()
                }}
            style={styles.aceitarButton}>
                <Text style={styles.buttonTxt}>Aceitar?</Text>
            </TouchableOpacity>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#e387ed",
        shadowColor: "#000",
        justifyContent: "center", // Isso coloca os elementos à esquerda e à direita
    
    },

    usuarioPCDNome: ({
        fontSize: 12,
        fontFamily: "DMRegular",

    }),
    buttonTxt: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    aceitarButton: {
        backgroundColor: 'green',
        width: 50,
        height: 20,
        justifyContent: 'right',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 50,
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
export default JornadaCard