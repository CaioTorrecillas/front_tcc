import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import api, { criarJornadaService } from '../../hook/api';
import { buscarJornadasByPCDService, pegaTokenService, chamaUsuarioByIDService, buscarUsuariosService, deleteJornadaService } from '../../hook/api';
import Modal from 'react-native-modal';
import JornadaCardPCD from '../../common/jornardaCardPCD';
import * as Notifications from 'expo-notifications';
import * as Speech from 'expo-speech'
import { Platform } from 'react-native';
//const Stack = createNativeStackNavigator();
import * as Device from 'expo-device';
import Constants from 'expo-constants';





Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class WelcomePCD extends Component {

  state = {
    isModalVisible: false,
    isModalDeleteVisible: false
  };
  constructor(props) {
    super(props);

    this.state = {
      //user_id: null,
      cep_origem: null,
      cep_destino: null,
      desc_pcd: null,
      desc_aux: '',
      numero_origem: null,
      numero_destino: null,
      telefone_pcd: '',
      jornadaAtiva: null,
      token: null,
      idEditar: null

    };
  }
  async componentDidMount() {
    buscarUsuariosService()
    const { name } = this.props.route.params;
    console.log("Iniciando...")
    Speech.speak('Bem vindo, ' + name + '.' + '! Voce pode criar uma jornada, digitando o CÉP de origem e destino e o número de origem e destino', {
      language: 'pt-BR',
      rate: 0.9
    })
    Speech.speak('Os campos estão no meio da tela. O botão mandar Jornada está no canto inferior direito da tela.', {
      language: 'pt-BR',
      rate: 0.9
    })
    Speech.speak('O botão Ver Jornada irá aparecer assim que você mandar uma jornada, ele está no canto inferior esquerdo', {
      language: 'pt-BR',
      rate: 0.9
    })
    Speech.speak('O botão para editar seu Perfil esta no canto superior direito.', {
      language: 'pt-BR',
      rate: 0.9
    })
    Speech.speak('O botão para apagar sua joranda, se tiver, está no canto superior esquerdo.', {
      language: 'pt-BR',
      rate: 0.9
    })

    try {
      const { id } = this.props.route.params;
      this.pegaId(id);
      const token = await this.registerForPushNotificationsAsync();
      if(token){
        console.log(token, id)
        pegaTokenService(token, id)
      }
      console.log(id)
      //pegaTokenService(id, token)


      const jornadas = await buscarJornadasByPCDService(id);
      this.setState({
        jornadaAtiva: jornadas
      })
      console.log(this.state.jornadaAtiva)

    } catch (error) {
      console.error('Erro:', error);
    }
  }
  notificarCampoNumeroOrigemInfo(text) {
    if (text === undefined || text.length === 0) {
      Speech.speak('Campo Numero Origem vazio', {
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
  
  registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log(token.data);
      //setExpoPushToken(token)
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token.data;
  }

  componentWillUnmount = () => {

    Speech.speak('Saindo da tela de bem vindo. Indo para Login', {
      language: 'pt-BR',
      rate: 0.9,
    })
    this.setState({ criado: false })

  }

  pegaId(id){
    this.setState({idEditar: id})
  }
  notificarCampoCEPOrigemInfo(text) {
    if (text === undefined || text.length === 0) {
      Speech.speak('Campo CEP Origem vazio', {
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
  notificarCampoCEPDestinoInfo(text) {
    if (text === undefined || text.length === 0) {
      Speech.speak('Campo CEP Destino vazio', {
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
  notificarCampoNumeroDestinoInfo(text) {
    if (text === undefined || text.length === 0) {
      Speech.speak('Campo Numero Destino vazio', {
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
  notificarCampoCEPDestino() {
    Speech.speak('Campo CEP de seu destino. Teclado Numérico', {
      language: 'pt-BR',
      rate: 0.9,
    })
  }
  notificarCampoCEPOrigem() {
    Speech.speak('Campo CEP de onde você está. Teclado Numérico', {
      language: 'pt-BR',
      rate: 0.9,
    })
  }
  notificarCampoNumeroOrigem() {
    Speech.speak('Campo Número de onde você está. Teclado Numérico', {
      language: 'pt-BR',
      rate: 0.9,
    })
  }
  notificarCampoNumeroDestino() {
    Speech.speak('Campo Número de seu destino. Teclado Numérico', {
      language: 'pt-BR',
      rate: 0.9,
    })
  }
  notificarCampoMensagem() {
    Speech.speak('Campo para mensagem para o auxiliar', {
      language: 'pt-BR',
      rate: 0.9,
    })
  }
  notificarCampoMensagemInfo(text) {
    if (text === undefined || text.length === 0) {
      Speech.speak('Campo Mensagem para o auxiliar vazio', {
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
  notificarUsuario() {
    Speech.speak('Você não está clicando em nada', {
      language: 'pt-BR',
      rate: 0.9,
    })
  }
  criarJornada = async () => {
    const { id, telefone } = this.props.route.params;
    const { cep_origem, cep_destino, desc_aux, desc_pcd, numero_origem, numero_destino } = this.state;
    console.log("Estou aqui");
    console.log(id);
    console.log(telefone)
    Speech.speak('Mandando sua jornada', {
      language: 'pt-BR',
      rate: 0.9,
    })
    console.log("Infos: " + cep_origem, cep_destino, numero_origem, numero_destino)
    if (cep_origem !== null && cep_destino !== null &&
      numero_origem !== null && numero_destino !== null && desc_pcd !== null) {
      console.log("Passeo. Vou chamar uma jornada")
      criarJornadaService(id, telefone, cep_origem, cep_destino, desc_aux, desc_pcd, numero_origem, numero_destino)

        .then((response) => {
          console.log(telefone)
          console.log(response);
          const status = response.status;
          if (status === 200) {
            console.log("Deu certo");
            buscarJornadasByPCDService(id)
              .then((jornadas) => {
                this.setState({
                  jornadaAtiva: jornadas
                });
              })
              .catch((error) => {
                console.error('Erro ao buscar jornadas:', error);
              });
          }
          Speech.speak('Jornada foi criada', {
            language: 'pt-BR',
            rate: 0.9,
          })
        }).catch((error) => {
          console.log(error)
        });

    } else {
      Speech.speak('Não mandamos sua jornada, pois, você precisa preencher todos os campos', {
        language: 'pt-BR',
        rate: 0.9,
      })
    }

  }

  deletarJornada = async () => {
    this.setState({ isModalDeleteVisible: !this.state.isModalDeleteVisible });
    console.log(this.state.idEditar, this.state.jornadaAtiva.data.jornadaExistente.id)
    deleteJornadaService(this.state.idEditar, this.state.jornadaAtiva.data.jornadaExistente.id).then((data) => {
      console.log(data)
      if(data.status == 200){
        Speech.speak('Jornada Deletada', {
          language: 'pr-BR',
          rate: 1.0
        })
      } 
    
        
    }).then(()=>{
      this.setState({
      jornadaAtiva: undefined
    })
   })

     
  
  } 

  async notificacaoPermissao() {
    /*console.log("notifi")
    let token;
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'projeto-tcc' })).data;
    console.log(token);*/
  }
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    if (this.state.isModalVisible) {
      Speech.speak('Saindo do ver Jornada.')
    } else {
      Speech.speak('Clicando no ver Jornada.')

    }


  };
  deleteModal = () => {
    this.setState({ isModalDeleteVisible: !this.state.isModalDeleteVisible });
    console.log(this.state.isModalDeleteVisible)
    if (this.state.isModalDeleteVisible) {
      Speech.speak('Desistindo de apagar jornada', {
        language: 'pr-BR',
        rate: 1.0
      })

    } else {

      Speech.speak('Clicando em botão deletar jornada. Se quiser apagar a jornada, clique no meio da tela', {
        language: 'pr-BR',
        rate: 1.0
      })

    }


  };

  render() {
    const { navigation } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.notificarUsuario}>
        <View style={styles.container}>

          <StatusBar backgroundColor="white" barStyle="light-content" />
          <Animatable.View delay={600} animation='fadeInUp' style={styles.containerForm}>
          <View style={styles.buttonContainerHead}>
          {this.state.jornadaAtiva !== undefined && (
          <TouchableOpacity
                  style={styles.deletarJornada}
                  onPress={this.deleteModal}
                >
                  <Text style={styles.buttonTxt}>
                    Deletar Jornada
                  </Text>
          </TouchableOpacity>
          )}
          <Modal onBackdropPress={this.deleteModal}
            isVisible={this.state.isModalDeleteVisible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={styles.buttonDel} onPress={() => {
                this.deletarJornada()
              }} >
                <Text style={styles.buttonTxt}>Deletar Jornada</Text>
              </TouchableOpacity>
            </View>

          </Modal>
          <TouchableOpacity
                  style={styles.buttonPerfil}
                  onPress={() => navigation.navigate("InfoPCD",  { id: this.state.idEditar })}
                >
                  <Text style={styles.buttonTxt}>
                    Ver Perfil
                  </Text>
              </TouchableOpacity>
          </View>
            <View style={styles.containerForm}>
              <Text style={styles.blind}>Bem vindo, {this.props.route.params.name}!</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onFocus={() => this.notificarCampoCEPOrigem()}
                onChangeText={(cep_origem) => {
                  this.setState({ cep_origem })
                  this.notificarCampoCEPOrigemInfo(cep_origem)
                }}
                placeholder="Qual o CEP de onde esta? "
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onFocus={() => this.notificarCampoNumeroOrigem()}
                onChangeText={(numero_origem) => {
                  this.setState({ numero_origem })
                  this.notificarCampoNumeroOrigemInfo(numero_origem)
                }}
                placeholder="Qual o numero de onde esta? "
              />

              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onFocus={() => this.notificarCampoCEPDestino()}
                onChangeText={(cep_destino) => {
                  this.setState({ cep_destino })
                  this.notificarCampoCEPDestinoInfo(cep_destino)
                }}
                placeholder="Qual o CEP de onde voce vai? "
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onFocus={() => this.notificarCampoNumeroDestino()}
                onChangeText={(numero_destino) => {
                  this.setState({ numero_destino })
                  this.notificarCampoNumeroDestinoInfo(numero_destino)
                }}
                placeholder="Qual o numero do seu destino? "
              />
              <TextInput
                style={styles.inputMensagem}
                onFocus={() => this.notificarCampoMensagem()}
                onChangeText={(desc_pcd) => {
                  this.setState({ desc_pcd })
                  this.notificarCampoMensagemInfo(desc_pcd)
                }}
                placeholder="Mensagem para auxiliar"
              />
              <View style={styles.buttonContainer}>
                <View style={styles.buttonContainerLeft}>
                  {this.state.jornadaAtiva !== undefined ? (
                    <TouchableOpacity
                      style={styles.buttonVerJornada}
                      onPress={() => {
                        this.toggleModal();
                      }}
                    >
                      <Text style={styles.buttonTxt}>Ver Jornada</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
                <TouchableOpacity
                  style={styles.buttonMandarJornada}
                  onPress={this.criarJornada}
                >
                  <Text style={styles.buttonTxt}>
                    Mandar Jornada
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </Animatable.View>
          <Modal onBackdropPress={this.toggleModal}
            isVisible={this.state.isModalVisible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <JornadaCardPCD data={this.state.jornadaAtiva} />
            </View>

          </Modal>
        </View>
        
      </TouchableWithoutFeedback>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  containerForm: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#FFF',
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  blind: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 12,
    color: 'black',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonContainerLeft: {
    flexDirection: 'row', 
  },
  buttonDel: {
    backgroundColor: 'red',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 110,
    borderRadius: 125,
  },
  inputMensagem: {
    width: '100%',
    height: 80,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  buttonFecharModal: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 100,
  },
  buttonContainerHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  buttonVerJornada: {
    backgroundColor: 'black',
    width: 100,
    justifyContent: 'center',
    height: 200,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,

  },
  buttonMandarJornada: {
    backgroundColor: 'black',
    width: 120,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'flex-end',
    borderRadius: 10,


  },
  buttonPerfil: {
    backgroundColor: 'black',
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'flex-end',
    borderRadius: 125,


  },
  deletarJornada: {
    backgroundColor: 'red',
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'flex-end',
    borderRadius: 125,



  },
  buttonTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomePCD;
