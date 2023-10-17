import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import api, { criarJornadaService } from '../../hook/api';
import { buscarJornadasByPCDService } from '../../hook/api';
import Modal from 'react-native-modal';
import JornadaCardPCD from '../../common/jornardaCardPCD';
import * as Notifications from 'expo-notifications';
import * as Speech from 'expo-speech'

class WelcomePCD extends Component {
  state = {
    isModalVisible: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      cep_origem: null,
      cep_destino: null,
      desc_pcd: null,
      desc_aux: '',
      numero_origem: null,
      numero_destino: null,
      telefone_pcd: '',
      jornadaAtiva: null,

    };
  }
  async componentDidMount() {
    const { name } = this.props.route.params;
    console.log("Iniciando...")
    Speech.speak('Bem vindo, ' + name + '.' + '! Voce pode criar uma jornada, digitando o CÉP de origem e destino e o número de origem e destino', {
      language: 'pt-BR',
      rate: 0.8
    })
    Speech.speak('Os campos estão no meio da tela. O botão mandar Jornada está no canto inferior direito da tela.')
    Speech.speak('O botão Aceitar Jornada irá aparecer assim que você mandar uma jornada, ele está no canto inferior esquerdo')
    try {
      const { id } = this.props.route.params;
      console.log(id)
      this.notificacaoPermissao()
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
  componentWillUnmount = () => {

    Speech.speak('Saindo da tela de bem vindo. Indo para Login', {
      language: 'pt-BR',
      rate: 0.9,
    })
    this.setState({ criado: false })

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



  render() {
    return (
      <TouchableWithoutFeedback onPress={this.notificarUsuario}>
        <View style={styles.container}>

          <StatusBar backgroundColor="white" barStyle="light-content" />

          <Animatable.View delay={600} animation='fadeInUp' style={styles.containerForm}>
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
    flexDirection: 'row', // Isso alinha os botões "Ver Jornada" à esquerda
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

  buttonVerJornada: {
    backgroundColor: 'black',
    width: 100,
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 125,

  },
  buttonMandarJornada: {
    backgroundColor: 'black',
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
