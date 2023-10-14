import React, { useState, useEffect, Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, PermissionsAndroid, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import MapView from 'react-native-maps';
const { width, height } = Dimensions.get('screen');
import { getCoordinatesFromCEPAndNumeroService } from '../../hook/api';

const MapaAux = (props) => {

    const [coordenadas, setCoordenadas] = useState(null);
    console.log(props.route.params.jornadaData.usuario.name)
    useEffect(() => {
        const onUnmount = () => {
            // Coloque aqui as ações que você deseja executar quando o componente for desmontado.
            // Por exemplo, parar de ouvir eventos, liberar recursos, etc.
            console.log("Componente MapaAux foi desmontado");
            setCoordenadas(null)
        };

        return onUnmount; // Esta função será executada quando o componente for desmontado
    }, []);

    obterCoordenadasParaItemService = async () => {
        //props.route.params.jornadaData.cep_origem, 
        //props.route.params.jornadaData.numero_origem, 
        console.log(props.route.params.jornadaData.cep_destino)
        const coordenadas = await getCoordinatesFromCEPAndNumeroService(props.route.params.jornadaData.cep_destino, 
        
            props.route.params.jornadaData.numero_destino);

        console.log(coordenadas)
        if (coordenadas) {
            console.log('Coordenadas para o item:', coordenadas);
            setCoordenadas(coordenadas);
        } else {
            console.log('Coordenadas não encontradas para o item.');
        }
    }
    obterCoordenadasParaItemService();
    return (

        <View style={styles.containerMaps}>
            <View >
                <Text>Jornada de {props.route.params.jornadaData.usuario.name}</Text>
            </View>
            <View >
                <Text>{props.route.params.cep_origem}</Text>
            </View>

            <MapView
                onMapReady={() => {
                    
                }}
                region={
                    coordenadas
                      ? {
                          latitude: coordenadas.latitude,
                          longitude: coordenadas.longitude,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }
                      : null
                  }
                style={{ width: width, height: height }}
                zoomEnabled={true}
                showsUserLocation={true} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});

export default MapaAux;
