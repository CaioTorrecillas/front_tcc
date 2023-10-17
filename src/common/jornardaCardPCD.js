import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { buscarJornadasByPCDService } from '../hook/api';
import * as Speech from 'expo-speech'
const JornadaCardPCD = (props) => {
    const navigation = useNavigation(); // Usando useNavigation
    const [dadosCarregados, setDadosCarregados] = useState(false);
    const [descAux, setDescAux] = useState('');
    const [nomeAux, setNomeAux] = useState('');
    const [telefoneAux, setTelefoneAux] = useState('');
    const [aceito, setAceito] = useState(0);

    const { data } = props;
    console.log("Estou no modal de info Jornada")
    console.log(data.data.jornadaExistente.numero_origem)
    console.log(data)
    useEffect(() => {
    
        if (!dadosCarregados) {
            chamarJornada();
        }

    }, [dadosCarregados]);
    useEffect(()=>{
        Speech.speak('Aqui você pode ter informações da sua jornada ativa')
        console.log(aceito)
        return
    }, [])

    const chamarJornada = async () => {
        console.log("entrando aqui")
        const jornada = await buscarJornadasByPCDService(data.data.jornadaExistente.user_id);
        if (jornada) {

            //cepDestino = jornada.data.jornadaExistente.cep_destino;
            //numeroDestino = jornada.data.jornadaExistente.numero_destino;
            setDescAux(jornada.data.jornadaExistente.desc_aux);
            setNomeAux(jornada.data.jornadaExistente.nome_aux);
            setTelefoneAux(jornada.data.jornadaExistente.telefone_aux);
            setAceito(jornada.data.jornadaExistente.aceito);
            setDadosCarregados(true);
            if(jornada.data.jornadaExistente.aceito == 0){
                Speech.speak('Sua jornada ainda não foi aceita', {
                    language: 'pt-BR',
                    rate: 1.1,
                })
            }else if (jornada.data.jornadaExistente.aceito == 1){
                Speech.speak('Sua jornada foi aceita por ' +jornada.data.jornadaExistente.nome_aux+'. Lendo mensagem do auxiliar', {
                    language: 'pt-BR',
                    rate: 1.1,
                })
                Speech.speak('Mensagem do auxiliar, '+jornada.data.jornadaExistente.desc_aux, {
                    language: 'pt-BR',
                    rate: 1.1,
                })
                Speech.speak('Telefone do auxiliar', {
                    language: 'pt-BR',
                    rate: 1.1,
                })
                speakPhoneNumber(jornada.data.jornadaExistente.telefone_aux)
               
            }
        }

    }
    function speakPhoneNumber(phoneNumber) {
        if (phoneNumber) {
          const numberDigits = phoneNumber.split('');
          const speechDelay = 500; // Atraso em milissegundos entre os dígitos
      
          function speakDigit(index) {
            if (index < numberDigits.length) {
              const digit = numberDigits[index];
              Speech.speak(digit, {
                language: 'pt-BR',
                rate: 1.1,
              });
      
              setTimeout(() => speakDigit(index + 1), speechDelay);
            }
          }
      
          speakDigit(0); // Inicie a leitura do primeiro dígito
        }
      }
    if (!dadosCarregados) {
        return null;

    }

    return (
        <TouchableOpacity style={styles.container}>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>CEP do Destino:</Text>
                <TextInput
                    style={styles.input}
                    value={data.data.jornadaExistente.cep_destino}
                    onChangeText={(text) => {

                    }}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Número do Destino:</Text>
                <TextInput
                    style={styles.input}
                    value={data.data.jornadaExistente.numero_destino}
                    onChangeText={(text) => {

                    }}
                />
            </View>




            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sua mensagem:</Text>


            </View>
            <TextInput
                style={styles.input}
                value={"-" + data.data.jornadaExistente.desc_pcd}
                onChangeText={(text) => {

                }}
            />
            <View style={styles.separator} />

            <View style={styles.inputContainer}>
                <Text style={styles.labelAuxiliar}>Mensagem do Auxiliar:</Text>

            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label} numberOfLines={3}>
                    {descAux}
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome do Auxiliar:-{nomeAux}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Telefone do Auxiliar: -{telefoneAux}</Text>

            </View>
            <View style={styles.inputContainer}>
                <Text style={[styles.label, styles.importantLabel]}>Aceito?: {aceito === 1 ? 'Sim' : 'Não'}</Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

    container: {
        width: 400,
        padding: 24,
        height: 450,
        borderRadius: 16,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 2,
        justifyContent: "space-between",
        shadowColor: "#F3F4F8",
    },
    descricao: {
        fontSize: 14,
        flexWrap: 'wrap',
    },
    input: {
        fontSize: 20,
    },
    separator: {
        height: 1,
        backgroundColor: 'green',
        marginTop: 10,
        marginBottom: 10,
    },
    usuarioPCDNome: ({
        fontSize: 12,
        fontFamily: "DMRegular",
        fontWeight: 'bold',

    }),
    searchBtn: {

    },
    label: {
        fontSize: 20
    },
    labelAuxiliar: {
        fontSize: 20
    },
    importantLabel: {
        fontSize: 18,
        borderColor: 'red',
        borderWidth: 2,
        padding: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    aceitarButton: {
        width: 70,
        height: "15%",
        backgroundColor: 'orange',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    infoContainer: {
        marginTop: 20,
    },
    origem: {
        fontSize: 12,
        fontFamily: "DMRegular",
        color: "#f7021f",
    },
    destino: {
        fontSize: 12,
        fontFamily: "DMRegular",
        color: "#f7021f",
    }

});
export default JornadaCardPCD;