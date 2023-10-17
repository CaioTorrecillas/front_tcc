import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { criarUsuarioService, buscarUsuariosService } from '../../hook/api';
import { CheckBox } from 'react-native-elements';
import * as Speech from 'expo-speech'

class CadastroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      senha: null,
      idade: null,
      tipo: null,
      telefone: null,
      statusGet: false,
      camposFaltando: false,
      criado: false,
      vozTela: true,
    };
  }
  async componentDidMount() {
    console.log("-------------")
    const { spokenText } = this.props.route.params;
    console.log(spokenText)
    await this.setState({ vozTela: spokenText }, () => {
      console.log(this.state.vozTela);
      if (this.state.vozTela) {
        Speech.speak('Tela de cadastro. Botão para cadastro no centro inferior da tela. Campos para seu cadastro estão no meio da tela', {
          language: 'pt-BR',
          rate: 0.9,
        });
      }
    });
    console.log(this.state.vozTela);
  }
  componentWillUnmount = () => {
    if (this.state.vozTela) {
      Speech.speak('Saindo da tela de cadastro.', {
        language: 'pt-BR',
        rate: 0.9,
      })
      this.setState({ criado: false })
    }
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
    if (this.state.vozTela) {
      Speech.speak('Campo Nome', {
        language: 'pt-BR',
        rate: 0.9,
      })
    }

  }
  notificarCampoNomeInfo = (text) => {
    if (this.state.vozTela) {
      Speech.speak(text, {
        language: 'pt-BR',
        rate: 0.9,
      })
    }
  }
  notificarCampoSenha = () => {
    if (this.state.vozTela) {
      Speech.speak('Campo Senha', {
        language: 'pt-BR',
        rate: 0.9,
      })
    }
  }
  notificarCampoSenhaInfo = (text) => {
    if (this.state.vozTela) {
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
  notificarCampoTelefone = () => {

    if (this.state.vozTela) {
      Speech.speak('Campo Telefone. Teclado Numérico', {
        language: 'pt-BR',
        rate: 0.9,
      })
    }

  }
  notificarCampoCelInfo = (text) => {
    if (this.state.vozTela) {
      if (text === undefined || text.length === 0) {
        Speech.speak('Campo celular vazio', {
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

  notificarCampoTipo = () => {
    if (this.state.vozTela) {
      Speech.speak('Campo Tipo. Se você for usuário com deficiência visual. Preencha este campo com as letras', {
        language: 'pt-Br',
        rate: 0.9,
      })
      Speech.speak('.PE. C. D', {
        language: 'pt-BR',
        rate: 0.6,
      })
    }

  }
  notificarCampoTipoInfo = (text) => {
    console.log(this.state.vozTela)
    if (this.state.vozTela) {
      if (text === undefined || text.length === 0) {
        Speech.speak('Campo Tipo vazio', {
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
  notificarCampoIdade = () => {
    if (this.state.vozTela) {
      Speech.speak('Campo Idade. Teclado Numérico', {
        language: 'pt-BR',
        rate: 0.9,
      })
    }
  }
  notificarCampoIdadeInfo = (text) => {
    if (this.state.vozTela) {
      Speech.speak(text, {
        language: 'pt-BR',
        rate: 0.9,
      })
    }
  }
  notificarUsuario = () => {
    if (this.state.vozTela) {
      Speech.speak('Você não está clicando em nada', {
        language: 'pt-BR',
        rate: 0.9,
      })
    }
  }


  handleCadastro = () => {
    console.log("Fazendo cadastro")
    const { name, senha, tipo, idade, telefone } = this.state;
    console.log(name, senha, tipo, idade, telefone);
    console.log(tipo)
    const tipoLowerCase = tipo ? tipo.replace(/\s/g, "").toLowerCase() : tipo;
    if (tipoLowerCase !== 'aux' && tipoLowerCase !== 'pcd') {
      console.log("digitou errado")

      this.setState({ camposFaltando: true });
      if(this.state.vozTela){
        Speech.speak('Por favor, digite seu tipo de usuário corretamente', {
          language: 'pt-BR',
          rate: 1.0,
        })
      }
     
    } else {
      if (name !== null && senha !== null && tipoLowerCase !== null && idade !== null && telefone !== null) {
        this.setState({ camposFaltando: false });
        console.log(name, senha, tipoLowerCase, idade, telefone)
        this.setState({ criado: true })
        criarUsuarioService(name, senha, tipoLowerCase, idade, telefone, this.state.vozTela)
          .then((response) => {
            console.log(response)
            console.log("Deu certo")
            this.state.statusGet = true

          })
        buscarUsuariosService();
      } else {
        if(this.state.vozTela){
          Speech.speak('Por favor, preencha todos os campos', {
            language: 'pt-BR',
            rate: 1.0,
          })
  
        }
 
        this.setState({ camposFaltando: true });


      }
    }




  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.notificarUsuario}>
      <View style={styles.container}>
        <Text style={styles.title}>Faça o seu cadastro</Text>
        {this.state.camposFaltando && (
          <Text style={styles.titleWarning}>Faltando campos para o seu cadastro</Text>
        )}
        {this.state.criado ? (
          <Text style={styles.titleCriado}>Usuário criado</Text>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              onFocus={() => this.notificarCampoNome(this.state.name)}
              onChangeText={(name) => {
                this.setState({ name });
                this.notificarCampoNomeInfo(name);
              }}
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
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo. Preencher com Pcd ou Aux"
              onFocus={this.notificarCampoTipo}
              onChangeText={(tipo) => {
                this.setState({ tipo });
                this.notificarCampoTipoInfo(tipo);
              }}
            />
            <TouchableOpacity style={styles.buttonCad} onPress={this.handleCadastro}>
              <Text style={styles.buttonTxt}>Cadastrar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
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
    borderRadius: 10,


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

export default CadastroScreen;