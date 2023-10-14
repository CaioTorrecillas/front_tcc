import React, { Component, useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import JornadaCard from '../../common/jornadaCard.js';
import * as Animatable from 'react-native-animatable'
import api, { buscarJornadasService } from '../../hook/api'
import Voice from '@react-native-voice/voice';

const data = [
    { id: '1', nomePCD: 'Joao Da Silva', origem: "Rua Teste, 123", destino: "Rua Teste, 345" },
    { id: '2', nomePCD: 'Gabriel Da Silva', origem: "Rua Teste, 3123112123", destino: "Rua Teste, 365445" },
    { id: '3', nomePCD: 'Felipe Da Silva', origem: "Rua Teste, 14151223", destino: "Rua Teste, 3456456545" },
    { id: '4', nomePCD: 'Roberto Da Silva', origem: "Rua Teste, 125151223", destino: "Rua Teste, 3546456445" },
    { id: '5', nomePCD: 'Ricardo Da Silva', origem: "Rua Teste, 16545623", destino: "Rua Teste, 364645" },

    // ...outros itens
];


class WelcomeAux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jornadas: [],
            name: '',
            isListening: false,
            recognizedText: '',


        }
    }

    async componentDidMount() {
        console.log("Iniciando")
        try {
            const { name } = this.props.route.params;
            // Coloque seu código assíncrono aqui
            const response = await buscarJornadasService();
            console.log(response);
            this.setState({
                jornadas: response.data.todasJornadas,
                name: name
            })
            console.log(this.state.jornadas)
            console.log(this.state.name)

        } catch (error) {
            console.error('Erro:', error);
        }
    }
 
    render() {

        const dadosFiltrados = this.state.jornadas.filter(item => item.ativo === 1);
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="white" barStyle="light-content" />

                <View style={styles.containerLogo}>

                    <Animatable.Image
                        animation='flipInY'

                        style={{ width: '100%', height: 415, borderRadius: 100 }}
                        resizemode="contain" />

                </View>

                <Animatable.View delay={600} animation='fadeInUp' style={styles.containerForm}>
                    <Text style={styles.usuarioAuxTitle}>Bem vindo, {this.state.name}! </Text>
                    <Text style={styles.text}>Veja as jornadas</Text>
                    <FlatList
                        style={styles.flatList}
                        data={dadosFiltrados}
                        keyExtractor={item => item.id}
                        //descontruindo a lista
                        renderItem={({ item }) => (
                            <JornadaCard data={item}
                            />
                        )}

                        contentContainerStyle={{ columnGap: 20 }}
                        horizontal
                    />
                </Animatable.View>
            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    containerLogo: {
        flex: 2,
        backgroundColor: 'white',
        //justifyContent: 'center',
        alignItems: 'center'
    },
    flatList: {
        //width: 400,
        //paddingVertical: 12 / 4,
        //paddingHorizontal: 0,
        //borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
    },
    containerForm: {
        flex: 3,
        backgroundColor: '#FFF',
        paddingStart: '10%',
        paddingEnd: '10%'
    },
    tittle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 12,
        color: 'black',
        alignItems: 'center',
        alignSelf: 'center'
    },
    text: {
        fontSize: 20,
        color: 'black',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 220,
        bottom: '15%',
    },
    button1: {
        position: 'absolute',
        backgroundColor: 'black',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button2: {
        position: 'absolute',
        backgroundColor: 'black',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF'
    },
    usuarioAuxTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: -100,
        marginBottom: 12,
        color: 'black',
        alignItems: 'center',
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
export default WelcomeAux;