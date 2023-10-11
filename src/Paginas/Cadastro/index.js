import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

class CadastroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      cpf:'',
      dataNascimento:'',
    };
  }

  handleCadastro = () => {
    const { nome, email, senha, telefone, cpf, dataNascimento } = this.state;

    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);
    console.log('Telefone', telefone);
    console.log('CPF', cpf);
    console.log('Data de nascimento', dataNascimento);
  }

  render() {
    return (
      <View style={styles.container}>
        
         <Image
        animation='flipInY'
        source={require('../../assets/tentativa.png')}
        style={styles.img}
        resizemode="contain"/>

        <Text style={styles.title}>Faça o seu cadastro</Text>
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
            placeholder='Idade'
            onChangeText={(dataNascimento) => this.setState({ dataNascimento })}/>

        <TouchableOpacity style={styles.buttonCad}>
          <Text style={styles.buttonTxt}>Cadastrar</Text>
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
  buttonCad:{
    backgroundColor: 'black',
      width:250,
      height:50,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      marginTop:10,
      borderRadius: 125,

  },
  buttonTxt:{
    color: 'white', 
    fontSize: 16,   
    fontWeight: 'bold',
  },
  img:{
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -100,

  }
 
});

export default CadastroScreen;