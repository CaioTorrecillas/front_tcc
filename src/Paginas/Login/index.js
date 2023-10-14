import { React, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Autenticator/Autenticar'; // Importe useAuth
import * as Speech from 'expo-speech'
const windowHeight = Dimensions.get('window').height;
import api, { loginUsuarioService } from '../../hook/api';
import Voice from '@react-native-voice/voice'

const LoginScreen = () => {
    const usuarios = "usuarios"
    const [endpoint, setEndpoint] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('Bem vindo Usuario. Caso voce tiver deficiencia visual esse aplicativo pode te ajudar');
    const [spokenText, setSpokenText] = useState('');

   
    const navigation = useNavigation();
    const fazerLogin = async () => {
        loginUsuarioService(username, password)
            .then(function (response) {
                const status = response.status
                const tipo = response.data.usuarioUnico.tipo
                const id = response.data.usuarioUnico.id;
                const name = response.data.usuarioUnico.name
                const telefone = response.data.usuarioUnico.telefone
                console.log(response.data.usuarioUnico.telefone)
                console.log(id)
                console.log(status)
                console.log(tipo)
                if (status == 200) {
                    if (tipo == 'PCD' || tipo == 'Pcd') {
                        navigation.navigate('WelcomePCD', {id, name, telefone});
                    } else if (tipo == 'AUX' || tipo == 'Aux') {
                        navigation.navigate('WelcomeAux', {name});
                    }
                    alert('Logado com sucesso');
                }
               
            })
            .catch(function (error) {
                console.log(error);
            });
                 
            
    }
    /*
    useEffect(() => {
        api.get('List').then(({data}) => {
            setAlgumacoisa(data)
        })

    })
    */
    const buscarUsuarios = async () => {
        try {
            //resposta da api
            setEndpoint("/usuarios")
            const response = await api.get(`${endpoint}`)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    /*function speak(){
        Speech.speak(text, {
            language: 'pt-BR'
        })
    }*/
    function gravarVoz (){
       Voice.start('pr-BR');

    }
    return (
        <View style={styles.container}>

            <Animatable.View
                delay={100}
                animation='fadeInUp'
                style={[styles.containerForm, { height: windowHeight / 2  }]}>
                <Text style={styles.title1}>Faça o seu Login</Text>
                <TextInput
                    style={styles.txt}
                    placeholder="Nome de Usuário"
                    onChangeText={(username) => setUsername(username)}
                />
                <TextInput
                    style={styles.txt}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <View style={[styles.buttonContainer, { flex: 3 / 3 }]}>
                    <TouchableOpacity
                        style={styles.buttonEntrar}
                        onPress={() => {
                            fazerLogin();
                        }}>
                        <Text style={styles.buttonTxt}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCadastro} onPress={() => {
                        navigation.navigate('CadastroScreen');
                        this.handleLogin;
                    }}>
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
        backgroundColor: 'white',
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: 100

    },
    txt: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10, 
        marginTop: 15,
      },
    buttonCadastro: {
        backgroundColor: 'black',
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 125,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonEntrar: {
        backgroundColor: 'black',
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 125,
    },
    buttonAux: {
        backgroundColor: 'black',
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 125,
    },
    buttonTxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title1: {
        fontSize: 30,
        marginBottom: 60,
        textAlign: 'center',
        color: 'black'
    }

});

export default LoginScreen;