import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {
    const navigation = useNavigation(); // Obtenha a função de navegação
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'usuario' && password === 'senha') {
            alert('Login bem-sucedido!');
            //navigation.navigate('CadastroScreen'); // Navegue para a tela "Welcome"
        } else {
            alert('Login falhou. Verifique seu nome de usuário e senha.');
        }
    }

    return (
        <View style={styles.container}>

            <Animatable.Image
                animation='fadeInUp'

                style={{ width: '100%', height: 394, }}
                resizeMode="contain" />

            <Animatable.View delay={100} animation='fadeInUp' style={[styles.containerForm, { height: windowHeight / 3 }]}>
                <Text style={styles.tit}>Blind Uber</Text>
                <Text style={styles.title}>Faça o seu Login</Text>
                <TextInput
                    style={styles.txt}
                    placeholder="Nome de Usuário"
                    onChangeText={(username) => this.setState({ username })}
                />
                <TextInput
                    style={styles.txt}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <View style={[styles.buttonContainer, { flex: 2 / 3 }]}>
                    <TouchableOpacity 
                    style={styles.buttonEntrar}  
                    onPress={() => { 
                        navigation.navigate('Welcome'); 
                        this.handleLogin; }}>
                        <Text style={styles.buttonTxt}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.buttonCadastro} onPress={() => { 
                        navigation.navigate('CadastroScreen'); 
                        this.handleLogin; }}>
                        <Text style={styles.buttonTxt}>Registrar-se</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        color: 'black',
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingStart: '5%',
        paddingEnd: '5%'

    },
    txt: {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        marginTop: 15
    },
    buttonCadastro: {
        backgroundColor: 'black',
        width: 250,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 125,
    },
    buttonEntrar: {
        backgroundColor: 'black',
        width: 250,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 70,
        borderRadius: 125,
    },
    buttonTxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    tit: {
        fontSize: 30,
        marginBottom: 16,
        textAlign: 'center',
        color: 'black'
    }

});

export default LoginScreen;