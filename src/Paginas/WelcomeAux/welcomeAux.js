import React, { Component, useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Button, FlatList } from 'react-native';
import JornadaCard from '../../common/jornadaCard.js';
import * as Animatable from 'react-native-animatable'
import api, { buscarJornadasService } from '../../hook/api'



class WelcomeAux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jornadas: [],
            name: '',
            isListening: false,
            recognizedText: '',
            idEditar: null,

        }
    }

    async componentDidMount() {
        console.log("Iniciando")
        this.fetchData();
    }
    async fetchData() {
        try {
            const { id, name, telefone } = this.props.route.params;
            console.log(id)
            const response = await buscarJornadasService();
            this.setState({
                jornadas: response.data.todasJornadas,
                name: name,
                idEditar: id
            });
            console.log("metodo refresh")
            console.log(this.state.jornadas)
            console.log(this.state.name)
        } catch (error) {
            console.error('Erro:', error);
        }
    }
    refreshScreen = () => {
        // Chame o método fetchData novamente para atualizar os dados

        this.fetchData();
    }
    render() {

        const { navigation } = this.props;
        console.log("noemeekqweowq")
        //const dadosFiltradosJorandasAtivas = dadosFiltradosJorandasAtivas.filter(item => item.ativo === 1);
        console.log(this.state.name)
        const dadosFiltradosJornadasAtivas = this.state.jornadas.filter((item) => 

            item.nome_aux === this.state.name && item.ativo === 1 || (item.nome_aux === "" && item.ativo === 1) || (item.nome_aux === null  && item.ativo === 1 ) || (item.nome_aux === undefined && item.ativo === 1)
        );
        console.log("Jornadas filtradas")
        console.log(dadosFiltradosJornadasAtivas)
        return (
            <View style={styles.container}>

                <StatusBar backgroundColor="white" barStyle="light-content" />
                <View style={styles.buttonPerfilContainer}>

                <TouchableOpacity
                        style={styles.buttonPerfil}
                        onPress={() => navigation.navigate("InfoAUX", { id: this.state.idEditar })}
                    >
                        <Text style={styles.buttonText}>
                            Perfil
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerLogo}>

                    <Animatable.Image
                        animation='flipInY'

                        style={{ width: '100%', height: 415, borderRadius: 100 }}
                        resizemode="contain" />

                </View>

                <Animatable.View delay={600} animation='fadeInUp' style={styles.containerForm}>

                   



                    <Text style={styles.usuarioAuxTitle}>Bem vindo, {this.state.name}! </Text>

      
               

                    <Text style={styles.text}> Veja as jornadas disponiveis.</Text>
                    <Text style={styles.textDica}>  Após aceitar uma jornada clique em refresh! </Text>
           

                    <View style={styles.refreshContainer}>
                        <TouchableOpacity style={styles.refreshButton} onPress={this.refreshScreen}>
                            <Text style={styles.refreshButtonText}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
     
                    <FlatList
                        style={styles.flatList}
                        data={dadosFiltradosJornadasAtivas}
                        keyExtractor={item => item.id}
                        //descontruindo a lista
                        renderItem={({ item }) => (
                            <JornadaCard data={item} telefone={this.props.route.params.telefone} name_aux={this.state.name}
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
        flex: 2,
        backgroundColor: 'white',
        marginTop: -20,
    },
    buttonPerfilContainer: {
        //position: 'absolute',
        top: 20, // Coloca o botão no topo da tela
        width: '100%',
        height: 100,
        alignItems: 'center',
    },
    containerLogo: {
        flex: 1,
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
    refreshButton: {
        backgroundColor: '#4169E2', // Cor azul clara
        borderRadius: 10, // Borda arredondada
        padding: 1,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    refreshContainer: {
        marginBottom: 10,
    },
    textDica: {
        fontSize: 10,
        color: 'black',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 100,
        bottom: '20%',
    },
    buttonPerfil: {
        backgroundColor: 'black',
        borderRadius: 50,
        width: 70,
        //marginLeft: 200,
        alignItems: 'center',
        //justifyContent: 'left'
    },
    refreshButtonText: {
        color: 'white',
        fontSize: 16,
    },
    containerForm: {
        flex: 5,
        backgroundColor: '#FFF',
        paddingStart: '10%',
        paddingEnd: '10%',
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
        marginTop: 100,
        bottom: '10%',
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
        color: '#FFF',
        justifyContent: 'center'
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