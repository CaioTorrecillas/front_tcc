import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, } from 'react-native';

class CadastroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      cpf: '',
      dataNascimento: '',
    };
  }

  handleCadastro = () => {
    const { nome, email, senha, telefone, cpf, dataNascimento, foto } = this.state;

    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);
    console.log('Telefone', telefone);
    console.log('CPF', cpf);
    console.log('Data de nascimento', dataNascimento);
  }

  handleEscolherFoto = () => {
    const options = {
      title: 'Escolha uma foto',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar Foto',
      chooseFromLibraryButtonTitle: 'Escolher da Galeria',
    };
      
    }
  render() {
    const { foto } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Faça o seu cadastro</Text>

        {foto && (
          <Image source={foto} style={styles.img} />
        )}

        <TouchableOpacity style={styles.buttonFoto} onPress={this.handleEscolherFoto}>
          <Text style={styles.buttonTxt}>Escolher Foto</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={(nome) => this.setState({ nome })}
        />

<TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(senha) => this.setState({ senha })}
        />
        <TextInput
            style={styles.input}
            placeholder='Telefone'
            onChangeText={(telefone) => this.setState({ telefone })}/>
        <TextInput
            style={styles.input}
            placeholder='CPF'
            onChangeText={(cpf) => this.setState({ cpf })}/>
        <TextInput
            style={styles.input}
            placeholder='Data de nascimento'
            onChangeText={(dataNascimento) => this.setState({ dataNascimento })}/>

        <TouchableOpacity style={styles.buttonCad} onPress={this.handleCadastro}>
          <Text style={styles.buttonTxt}>Alterar</Text>
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
    borderRadius: 125,
  },
  buttonTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  img: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  },
);

export default CadastroScreen;
