import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { criarUsuarioService, buscarUsuariosService, editarUsuarioService, deleteUsuarioService } from '../../hook/api';
import { CheckBox } from 'react-native-elements';
import * as Speech from 'expo-speech'
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
const windowHeight = Dimensions.get('window').height;


import { chamaUsuarioByIDService } from '../../hook/api'

class InfoAUX extends Component {
  state = {
    isModalVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      idade: 0,
      senha: null,
      telefone: null,
      camposFaltando: false,
      criado: false,
      id: null,

    };
  }
  async componentDidMount() {
    console.log("Editar Aux")
    this.setState({ isModalVisible: false })
    const { id } = this.props.route.params;
    this.setState({ id: id })
    console.log(id)
    try {
      const usuario = await chamaUsuarioByIDService(id);
      console.log(usuario.data.idade)
      this.setState({ name: usuario.data.name, idade: usuario.data.idade, senha: usuario.data.senha, telefone: usuario.data.telefone })

    } catch (error) {
      console.log(error)

    }


  }
  componentWillUnmount = () => {

    this.setState({ criado: false })

  }

  buscarUsuarios = async () => {
    try {
      const response =
        console.log(response);
    } catch (error) {
      console.log(error);
    }


  }

  chamaUsuarioByIDService(id) {
    //const jornadas = await chamaUsuarioByIDService(id);

  }

  editarPerfil = async () => {

    console.log(this.state.id, this.state.name, this.state.senha, this.state.telefone, this.state.idade)
    if (this.state.name && this.state.senha && this.state.telefone && this.state.idade) {
      await editarUsuarioService(this.state.id, this.state.name, this.state.senha, this.state.idade, this.state.telefone)

      console.log("passei")

    } else {
      console.log("nao passei")
    }




  }
  deleteModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    console.log(this.state.isModalVisible)





  };

  deletePerfil = (id) => {
    deleteUsuarioService(id)
  }
  render() {
    const { navigation } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => { this.notificarUsuario }}>

        <View style={[styles.container, { height: windowHeight / 2 }]}>

          <Animatable.View
            delay={100}
            animation='fadeInUp'
            style={[styles.containerForm, { height: windowHeight / 2 }]}>
            <Text style={styles.title}>Editar seu Perfil</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"

              onChangeText={(name) => {
                this.setState({ name });

              }}
              value={this.state.name}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry={true}
 
              onChangeText={(senha) => {
                this.setState({ senha });
         
              }}
              value={this.state.senha}
            />
            <TextInput
              style={styles.input}
              placeholder="Idade"
        
              keyboardType="numeric"
              onChangeText={(idade) => {
                this.setState({ idade });
          
              }}
              value={this.state.idade.toString()}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              keyboardType="numeric"
     
              onChangeText={(telefone) => {
                this.setState({ telefone });
       
              }}
              value={this.state.telefone}
            />
            
            <View style={[styles.buttonContainer, { flex: 3 / 3 }]}>
              <TouchableOpacity style={styles.buttonCad} onPress={() => {
                navigation.navigate("Login")
                this.editarPerfil()
              }}>
                <Text style={styles.buttonTxt}>Editar</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.buttonDel} onPress={this.deleteModal}>
                <Text style={styles.buttonTxt}>Deletar</Text>
              </TouchableOpacity>
            </View>
            <Modal onBackdropPress={this.deleteModal}
              isVisible={this.state.isModalVisible}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.buttonDel} onPress={() => {
                  navigation.navigate("Login")
                  this.deletePerfil(this.state.id)
                }} >
                  <Text style={styles.buttonTxt}>Deletar Confirmar</Text>
                </TouchableOpacity>
              </View>

            </Modal>
          </Animatable.View>
        </View>


      </TouchableWithoutFeedback>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'black'
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingStart: '5%',
    paddingEnd: '5%',
    marginTop: 100

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
  buttonCad: {
    backgroundColor: 'black',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 125,

  },
  buttonDel: {
    backgroundColor: 'red',
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 125,
  },
  titleWarning: {
    color: 'red',
  },
  titleCriado: {
    fontSize: 16,
    color: 'green',
  },
  buttonTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -100,

  }

});

export default InfoAUX;