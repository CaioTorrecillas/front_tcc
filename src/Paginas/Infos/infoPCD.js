import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { criarUsuarioService, buscarUsuariosService, editarUsuarioService, deleteUsuarioService } from '../../hook/api';
import { CheckBox } from 'react-native-elements';
import * as Speech from 'expo-speech'
import Modal from 'react-native-modal';



import { chamaUsuarioByIDService } from '../../hook/api'

class InfoPCD extends Component {
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
    console.log("Editar")
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


    Speech.speak('Tela de Perfil. Voce pode apagar seu perfil ou editar. Botão de apagar no fundo da tela, no meio. Botão de editar no topo, no meio', {
      language: 'pt-BR',
      rate: 0.8,
    });

  }
  componentWillUnmount = () => {

      Speech.speak('Saindo da tela de editar.', {
        language: 'pt-BR',
        rate: 0.9,
      })
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
  notificarCampoNome = () => {

    Speech.speak('Campo Nome' + this.state.name, {
      language: 'pt-BR',
      rate: 0.8,
    })


  }
  notificarCampoNomeInfo = (text) => {

    Speech.speak(text, {
      language: 'pt-BR',
      rate: 0.9,
    })

  }
  notificarCampoSenha = () => {

    Speech.speak('Campo Senha. ' + this.state.senha, {
      language: 'pt-BR',
      rate: 0.9,
    })

  }
  notificarCampoSenhaInfo = (text) => {

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

  notificarCampoTelefone = () => {
    let t = this.state.telefone

    if (!t) {

      Speech.speak('Campo Telefone. Teclado Numérico. Vazio', {
        language: 'pt-BR',
        rate: 0.9,
      });
    } else {

      const delay = 1000;

      for (let i = 0; i < t.length; i++) {
        setTimeout(() => {
          const numero = t[i];
          Speech.speak(numero, {
            language: 'pt-BR',
            rate: 1.1,
          });
        }, i * delay);
      }
    }
  };


  notificarCampoCelInfo = (text) => {

    if (text === undefined || text.length === 0) {
      Speech.speak('Campo celular vazio', {
        language: 'pt-BR',
        rate: 0.9,
      });
    } else {
      const lastCharacter = text[text.length - 1];
      Speech.speak("Campo telefone. " + lastCharacter, {
        language: 'pt-BR',
        rate: 0.9,
      });

    }

  }

  notificarCampoIdade = () => {

    Speech.speak('Campo Idade. Teclado Numérico' + this.state.idade, {
      language: 'pt-BR',
      rate: 0.9,
    })

  }
  notificarCampoIdadeInfo = (text) => {

    Speech.speak(text, {
      language: 'pt-BR',
      rate: 0.9,
    })

  }
  notificarUsuario = () => {

    Speech.speak('Você não está clicando em nada', {
      language: 'pt-BR',
      rate: 0.9,
    })

  }
  chamaUsuarioByIDService(id) {
    //const jornadas = await chamaUsuarioByIDService(id);

  }

  editarPerfil = async () => {

    console.log(this.state.id, this.state.name, this.state.senha, this.state.telefone, this.state.idade)
    if (this.state.name && this.state.senha && this.state.telefone && this.state.idade) {
      await editarUsuarioService(this.state.id, this.state.name, this.state.senha, this.state.idade, this.state.telefone)
      Speech.speak("Usuario editado. Indo para Loguin", {
        language: 'pt-BR',
      })
      console.log("passei")

    } else {
      console.log("nao passei")
    }




  }
  deleteModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    console.log(this.state.isModalVisible)
    if (this.state.isModalVisible) {
      Speech.speak('Desistindo de apagar perfil', {
        language: 'pr-BR',
        rate: 1.0
      })

    } else {

      Speech.speak('Clicando em botão deletar perfil. Se quiser apagar o perfil, clique no meio da tela', {
        language: 'pr-BR',
        rate: 1.0
      })

    }


  };

  deletePerfil = (id) => {
    deleteUsuarioService(id)
    
    Speech.speak('Apagando o seu perfil. Indo para Loguin', {
      language: 'pr-BR',
      rate: 1.0
    })
  }
  render() {
    const { navigation } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => { this.notificarUsuario }}>

        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonCad} onPress={() => {
            navigation.navigate("Login")
            this.editarPerfil()
          }}>
            <Text style={styles.buttonTxt}>Editar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>EDITAR PERFIL</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            onFocus={() => this.notificarCampoNome(this.state.name)}
            onChangeText={(name) => {
              this.setState({ name });
              this.notificarCampoNomeInfo(name);
            }}
            value={this.state.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            onFocus={this.notificarCampoSenha}
            onChangeText={(senha) => {
              this.setState({ senha });
              this.notificarCampoSenhaInfo(senha);
            }}
            value={this.state.senha}
          />
          <TextInput
            style={styles.input}
            placeholder="Idade"
            onFocus={this.notificarCampoIdade}
            keyboardType="numeric"
            onChangeText={(idade) => {
              this.setState({ idade });
              this.notificarCampoIdadeInfo(idade);
            }}
            value={this.state.idade.toString()}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            keyboardType="numeric"
            onFocus={this.notificarCampoTelefone}
            onChangeText={(telefone) => {
              this.setState({ telefone });
              this.notificarCampoCelInfo(telefone);
            }}
            value={this.state.telefone}
          />



          <TouchableOpacity style={styles.buttonDel} onPress={this.deleteModal}>
            <Text style={styles.buttonTxt}>Deletar</Text>
          </TouchableOpacity>
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

        </View>


      </TouchableWithoutFeedback>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'black'
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
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: -10,
    borderRadius: 125,

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

export default InfoPCD;