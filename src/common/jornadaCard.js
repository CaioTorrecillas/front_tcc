import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import AceitarCard from './aceitarCard';
import { terminarJornadaService } from '../hook/api';
const JornadaCard = (props) => {
    const navigation = useNavigation(); // Usando useNavigation
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { data, telefone, name_aux } = props;
    //const { telefone } = props;
    console.log(data)
    console.log(telefone)
    const navegarParaMapa = () => {
        navigation.navigate('MapaAux', { jornadaData: data });
    }
    const toggleModal = () => {
        
        setIsModalVisible(!isModalVisible);
        console.log(isModalVisible)
    };
    const terminarJornada = async () => {
        //console.log(data.usuario.id, data.id)
        const aceito = 0;
        const ativo = 0;
        await terminarJornadaService(data.usuario.id, data.id, aceito, ativo)
    };
    return (
        <TouchableOpacity style={[styles.container, data.aceito===1? styles.aceitoVerde : styles.container]}>
            {data.aceito === 1 && (
                <TouchableOpacity
                    onPress={terminarJornada}
                    style={styles.terminarButton}>
                    <Text style={styles.buttonTxt}>Terminar?</Text>
                </TouchableOpacity>
            )}
            <Text>Jornada de {data.usuario.name}</Text>
            <Text>Onde estou?: {data.cep_origem},{data.numero_origem} </Text>
            <Text>Meu Destino: {data.cep_destino}, {data.numero_destino} </Text>
            <Text style={styles.descricao}>
                Mensagem do Pcd: {data.desc_pcd}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={navegarParaMapa}
                    style={styles.aceitarButton}>
                    <Text style={styles.buttonTxt}>Ver</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleModal}
                    style={styles.aceitarButton}>
                    <Text style={styles.buttonTxt}>Aceitar?</Text>

                </TouchableOpacity>

            </View>
            <Modal onBackdropPress={toggleModal}
                isVisible={isModalVisible}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <AceitarCard telefone={telefone} 
                    id_usuario={data.usuario.id} 
                    id_jornada={data.id} 
                    name={data.usuario.name}
                    name_aux={name_aux}/>
                </View>

            </Modal>
        </TouchableOpacity>

    );
}


const styles = StyleSheet.create({

    container: {
        width: 250,
        padding: 24,
        borderRadius: 16,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: "space-between",
        shadowColor: "#F3F4F8",
    },
    descricao: {
        fontSize: 14,
        flexWrap: 'wrap',
    },
    usuarioPCDNome: ({
        fontSize: 12,
        fontFamily: "DMRegular",
        fontWeight: 'bold',

    }),
    searchBtn: {

    },
    aceitarButton: {
        width: 70,
        height: "100%",
        backgroundColor: 'orange',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    terminarButton: {
        width: 70,
        height: "10%",
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    aceitoVerde:{
        width: 250,
        padding: 24,
        borderRadius: 16,
        borderColor: '#00FF00',
        borderWidth: 2,
        justifyContent: "space-between",
        shadowColor: "#F3F4F8",
    },
    infoContainer: {
        marginTop: 20,
    },
    origem: {
        fontSize: 12,
        fontFamily: "DMRegular",
        color: "#f7021f",
    },
    buttonContainer: {
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    destino: {
        fontSize: 12,
        fontFamily: "DMRegular",
        color: "#f7021f",
    }

});
export default JornadaCard;