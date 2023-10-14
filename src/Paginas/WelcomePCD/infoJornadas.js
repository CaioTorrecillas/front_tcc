import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import api, { criarJornadaService } from '../../hook/api';
import { buscarJornadasByPCDService } from '../../hook/api';
import Modal from 'react-native-modal';
import JornadaCardPCD from '../../common/jornardaCardPCD';



class WelcomePCD extends Component {
  state = {
    isModalVisible: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      cep_origem: '',
      cep_destino: '',
      mensagem: '',
      mensagemAux: '',
      numero_origem: '',
      numero_destino: '',
      jornadaAtiva: null,

    };
  }
  async componentDidMount() {
    console.log("Iniciando...")
    try {
      const { id } = this.props.route.params;
      console.log(id)
      const jornadas = await buscarJornadasByPCDService(id);
      this.setState({
        jornadaAtiva: jornadas
      })
      console.log(this.state.jornadaAtiva)

    } catch (error) {
        console.error('Erro:', error);
    }
}
  criarJornada = async () => {
    const { id } = this.props.route.params;
    const { cep_origem, cep_destino, dessc_aux, desc_pcd, numero_origem, numero_destino } = this.state;
    console.log("Estou aqui");
    console.log(id);

    criarJornadaService(id, cep_origem, cep_destino, dessc_aux, desc_pcd, numero_origem, numero_destino)
      .then(function (response) {
        console.log(response);
        const status = response.status;
        if (status === 200) {
          console.log("Deu certo");
        }
      }).catch((error) => {
        console.log(error)
      });
  }
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };



  render() {
    return (
      <View style={styles.container}>

        <StatusBar backgroundColor="white" barStyle="light-content" />

        <Animatable.View delay={600} animation='fadeInUp' style={styles.containerForm}>
          <View style={styles.containerForm}>
            <Text style={styles.blind}>Bem vindo, {this.props.route.params.name}!</Text>

            <TextInput
              style={styles.input}
              onChangeText={(cep_origem) => this.setState({ cep_origem })}
              placeholder="Qual o CEP de onde esta? "
            />
             <TextInput
              style={styles.input}
              onChangeText={(numero_origem) => this.setState({ numero_origem })}
              placeholder="Qual o numero de onde esta? "
            />

            <TextInput
              style={styles.input}
              onChangeText={(cep_destino) => this.setState({ cep_destino })}
              placeholder="Qual o CEP de onde voce vai? "
            />
            <TextInput
              style={styles.input}
              onChangeText={(numero_destino) => this.setState({ numero_destino })}
              placeholder="Qual o numero do seu destino? "
            />
            <TextInput
              style={styles.inputMensagem}
              onChangeText={(desc_pcd) => this.setState({ desc_pcd })}
              placeholder="Mensagem para auxiliar"
            />
            <View style={[styles.buttonContainer, { flex: 3 / 3 }]}>
              <TouchableOpacity
                style={styles.buttonVerJornada}
                onPress = {() => {
                  this.toggleModal()
    
                }}
              >
                <Text style={styles.buttonTxt}>
                  Ver Jornada
                </Text>
              </TouchableOpacity>

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
        <Modal isVisible={this.state.isModalVisible}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <JornadaCardPCD data={this.state.jornadaAtiva}/>
                <TouchableOpacity onPress={this.toggleModal}>
                  <Text style={styles.buttonText}>
                    Fechar
                  </Text>
                </TouchableOpacity>
              </View>

            </Modal>
      </View>
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
  inputMensagem: {
    width: '100%',
    height: 80,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
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
  marginTop: 10,
  borderRadius: 125,
},
buttonTxt: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
});

export default WelcomePCD;
