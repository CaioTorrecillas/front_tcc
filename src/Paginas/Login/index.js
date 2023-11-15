import { React, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Autenticator/Autenticar'; // Importe useAuth
import * as Speech from 'expo-speech'
const windowHeight = Dimensions.get('window').height;
import api, { loginUsuarioService, buscarUsuariosService } from '../../hook/api';
import { TouchableWithoutFeedback } from 'react-native'
import { registerIndieID } from 'native-notify';


const LoginScreen = () => {
    const textoBemvindo = "Bem vindo a tela de Loguin! Se você não tem conta, clique no botão registrar-se! No lado direito inferior da tela. O botão de loguin fica do canto inferior esquerdo."
    const [endpoint, setEndpoint] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [spokenText, setSpokenText] = useState(true);
  

    const navigation = useNavigation();
    const fazerLogin = async () => {
        loginUsuarioService(username, password, spokenText)
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
                    if (tipo == 'PCD'.toLowerCase() || tipo == 'PCD'.toUpperCase() ||tipo == 'Pcd' ) {
                        navigation.navigate('WelcomePCD', { id, name, telefone });
                    } else if (tipo == 'AUX'.toLowerCase() ||tipo == 'AUX'.toUpperCase()||tipo == 'Aux' ) {
                        navigation.navigate('WelcomeAux', {id, name, telefone });
                        console.log(telefone)
                    }

                }

            })
            .catch(function (error) {
                console.log(error);
            });


    }

    useEffect(() => {
        buscarUsuariosService()
        if (spokenText) {
            Speech.speak(textoBemvindo, {
                language: 'pt-BR',
                rate: 0.9,
            })
        }
    }, [])
    useEffect(() => {

    }, [navigation])
    function notificarUsuario() {
        if (spokenText) {
            const clicandoNaTela = "Voce não está clicando em nada"
            Speech.speak(clicandoNaTela, {
                language: 'pt-BR',
                rate: 0.9,
            })
        }
    }
    function notificarCampoSenhaInfo(text) {
        if (spokenText) {
            if (text === undefined || text.length === 0) {
                Speech.speak('Campo Senha vazio', {
                    language: 'pt-BR',
                    rate: 0.9,
                });
            } else {
                const lastCharacter = text[text.length - 1];
                Speech.speak(lastCharacter, {
                    language: 'pt-BR',
                    rate: 0.9,
                });

            }
        }
    }
    function notificarCampoNameInfo(text) {
        if (spokenText) {
            if (text === undefined || text.length === 0) {
                Speech.speak('Campo Nome vazio', {
                    language: 'pt-BR',
                    rate: 0.9,
                });
            } else {
                const lastCharacter = text[text.length - 1];
                Speech.speak(lastCharacter, {
                    language: 'pt-BR',
                    rate: 0.9,
                });

            }
        }
    }
    function notificarUsuarioNome() {

        if (spokenText) {
            //const clicandoNaTela = 
            Speech.speak("Campo nome.", {
                language: 'pt-BR',
                rate: 0.9,
            })
        }



    }
    function notificarUsuarioSenha() {

        if (spokenText) {
            //const clicandoNaTela = 
            Speech.speak("Campo senha.", {
                language: 'pt-BR',
                rate: 0.9,
            })
        }




    }
    function notificarBotaoLogin() {

        if (spokenText) {
            //const clicandoNaTela = 
            Speech.speak("Botão de login.", {
                language: 'pt-BR',
                rate: 0.9,
            })
        }


    }
    function notificarBotaoCadastro() {

        if (spokenText) {
            //const clicandoNaTela = 
            Speech.speak("Botão de Cadastro. Indo para cadastro", {
                language: 'pt-BR',
                rate: 0.9,
            })

        }

    }
    function desativarAtivarVoz() {
        console.log(spokenText)
        if (spokenText) {
            Speech.speak('Botão para ativar ou desativar voz. Clique aqui para ativar novamente.', {
                language: 'pt-BR',
            })
            setSpokenText(false)
            console.log(spokenText)

        } else {
            setSpokenText(true)
            Speech.speak('Botão para ativar ou desativar voz. Ativando voz', {
                language: 'pt-BR',
            })
        }


    }
    /*function speak(){
        Speech.speak(text, {
            language: 'pt-BR'
        })
    }*/
    return (
        <TouchableWithoutFeedback onPress={notificarUsuario}>
            <View style={styles.container}>


                <Animatable.View
                    delay={100}
                    animation='fadeInUp'
                    style={[styles.containerForm, { height: windowHeight / 2 }]}>
                    <Text style={styles.title1}>Faça o seu Login - Alfa</Text>
                    <TextInput
                        style={styles.txt}
                        placeholder="Nome de Usuário"
                        onChangeText={(username) => {
                            setUsername(username)
                            notificarCampoNameInfo(username)
                        }}
                        onFocus={notificarUsuarioNome}
                    />
                    <TextInput
                        style={styles.txt}
                        placeholder="Senha"
                        onChangeText={(password) => {
                            setPassword(password)
                            notificarCampoSenhaInfo(password)
                        }}
                        onFocus={notificarUsuarioSenha}


                    />
                    <View style={[styles.buttonContainer, { flex: 3 / 3 }]}>
                        <TouchableOpacity
                            style={styles.buttonEntrar}
                            onPress={() => {
                                fazerLogin();
                                notificarBotaoLogin;
                            }}>
                            <Text style={styles.buttonTxt}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonVoz, { backgroundColor: spokenText ? 'green' : 'red' }]}
                            onPress={() => {
                                desativarAtivarVoz();
                            }}>
                            <Text style={styles.buttonTxt}>Voz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCadastro} onPress={() => {
                            navigation.navigate('CadastroScreen', {spokenText});
                            this.handleLogin;
                            notificarBotaoCadastro();
                        }}>
                            <Text style={styles.buttonTxt}>Registrar-se</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
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
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: -140,
    },
    buttonEntrar: {
        backgroundColor: 'black',
        width: 100,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
    },
    buttonVoz: {
        backgroundColor: 'green',
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
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