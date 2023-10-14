import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { criarUsuarioService, buscarUsuariosService } from '../../hook/api';
import { CheckBox } from 'react-native-elements';
class CadastroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      senha: '',
      idade: 0,
      tipo: '',
      telefone: '',
      statusGet: false,
    };
  }
  buscarUsuarios = async () => {
    try {
      const response = await buscarUsuariosService();
      console.log(response);
    } catch (error) {
      console.log(error);
    }


  }
  handleCadastro = async () => {
    console.log("djkndkajkds")
    const { name, senha, tipo, idade, telefone } = this.state;
    console.log(name, senha, tipo, idade, telefone);
    criarUsuarioService(name, senha, tipo, idade, telefone)
      .then((response) => {
        console.log(response)
        const status = response.status
        if (status == 200) {
          console.log("Deu certo")
          this.state.statusGet = true



        }
      })

  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Faça o seu cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(senha) => this.setState({ senha })}
        />
        <TextInput
          style={styles.input}
          placeholder="Idade"

          onChangeText={(idade) => this.setState({ idade })}
        />
        <TextInput
          style={styles.input}
          placeholder='Telefone'
          onChangeText={(telefone) => this.setState({ telefone })} />
        <TextInput
          style={styles.input}
          placeholder='Tipo'
          onChangeText={(tipo) => this.setState({ tipo })} />

        <TouchableOpacity style={styles.buttonCad}
        onPress={() => {
          this.handleCadastro();
          this.buscarUsuarios();
        }}>
          <Text style={styles.buttonTxt} >Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
  },
  buttonCad: {
    backgroundColor: 'black',
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,

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

export default CadastroScreen;