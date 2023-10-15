import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, PermissionsAndroid, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import MapView, { Marker, LatLng } from 'react-native-maps';

import { getLatElongGoogleService, getInfoCEPService } from '../../hook/api';
import MapViewDirections from "react-native-maps-directions";
import key from '../../config/index.json'

const { width, height } = Dimensions.get('screen');
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

const MapaAux = (props) => {
    const [mapRegionOrigem, setMapRegionOrigem] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });
    const [mapRegionDestino, setMapRegionDestino] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LATITUDE_DELTA

    });
    const mapRef = useRef(null);

    const moverOrigem = async (position) => {
        if (mapRef.current) {
            const camera = await mapRef.current.getCamera();
            console.log("Camera", camera);
            if (camera) {
                camera.center = position;
                camera.zoom = 20
                camera.latitudeDelta = LATITUDE_DELTA;
                camera.longitudeDelta = LONGITUDE_DELTA;
                mapRef.current.animateCamera(camera, { duration: 1000 });
            }
        }
    };
    useEffect(() => {
        async function buscarJornadaLocalizacoes() {
            console.log("Buscando numeros de origem destino no parametro navegacao")
            console.log(props.route.params.jornadaData.numero_origem);
            console.log(props.route.params.jornadaData.numero_destino);
            console.log("----------------------------")
            const responseOrigem = await getInfoCEPService(props.route.params.jornadaData.cep_origem);
            const responseDestino = await getInfoCEPService(props.route.params.jornadaData.cep_destino);
            //logica para ver retornos da api de cep
            if (responseOrigem.data.cep && 
                responseOrigem.data.logradouro 
                && responseOrigem.data.localidade
                && responseOrigem.data.uf   
                && responseDestino.data.cep && 
                responseDestino.data.logradouro 
                && responseDestino.data.localidade
                && responseDestino.data.uf) {
                console.log("ORIGEM")
                console.log(
                    responseOrigem.data.cep, 
                    responseOrigem.data.logradouro,
                    responseOrigem.data.uf, 
                    responseOrigem.data.localidade, 
                    props.route.params.jornadaData.numero_origem);
                console.log("----------------------------")   
                 console.log("DESTINO")
                console.log(
                    responseDestino.data.cep, 
                    responseDestino.data.logradouro,
                    responseDestino.data.uf, 
                    responseDestino.data.localidade, 
                    props.route.params.jornadaData.numero_destino);
                console.log("----------------------------")   
                const origem = await getLatElongGoogleService(
                    props.route.params.jornadaData.numero_origem,
                    responseOrigem.data.logradouro,
                    responseOrigem.data.localidade,
                    responseOrigem.data.uf,
                    responseOrigem.data.cep)

                const destino = await getLatElongGoogleService(
                    props.route.params.jornadaData.numero_destino,
                    responseDestino.data.logradouro,
                    responseDestino.data.localidade,
                    responseDestino.data.uf,
                    responseDestino.data.cep)
                console.log("DADOS DO GOOGLE GARIMPADOS")
                const latitude_origem = origem.data.results[0].geometry.location.lat;
                const longitude_origem = origem.data.results[0].geometry.location.lng;
                const latitude_destino = destino.data.results[0].geometry.location.lat;
                const longitude_destino = destino.data.results[0].geometry.location.lng;
                console.log(latitude_origem)
                console.log(longitude_origem)
                console.log(latitude_destino)
                console.log(longitude_destino)
               
                console.log("----------------------------")
                console.log("Setando valores do componente")
                setMapRegionOrigem({
                    latitude: latitude_origem,
                    longitude: longitude_origem,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                });
    
                setMapRegionDestino({
                    latitude: latitude_destino,
                    longitude: longitude_destino,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                });
                console.log('Latitude Origem:', mapRegionOrigem.latitude);
                console.log('Longitude Origem:', mapRegionOrigem.longitude);
                console.log('Latitude Destino:', mapRegionDestino.latitude);
                console.log('Longitude Destino:', mapRegionDestino.longitude);
                console.log("----------Parou------------------")
              

               
            }
        }

        buscarJornadaLocalizacoes();

        /*async function buscarInfoCEPmocado() {
            const newRegionOrigem = {
                latitude: -23.6632347,
                longitude: -46.6446538,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LATITUDE_DELTA,
            };
            const newRegionDestino = {
                latitude: -23.59909,
                longitude: -46.6372072,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LATITUDE_DELTA,
            };
            setMapRegionOrigem(newRegionOrigem);
            setMapRegionDestino(newRegionDestino)
            console.log(mapRegionOrigem)
            console.log(mapRegionDestino)
        }

        buscarInfoCEPmocado();*/
        console.log("Dados do componetne fora do useEffect")
        console.log('Latitude Origem:', mapRegionOrigem.latitude);
                console.log('Longitude Origem:', mapRegionOrigem.longitude);
                console.log('Latitude Destino:', mapRegionDestino.latitude);
                console.log('Longitude Destino:', mapRegionDestino.longitude);
                console.log("----------------------------")

    }, [props]);

  
 

    return (
        <View style={styles.container}>
            {mapRegionOrigem.latitude !== 0 && mapRegionDestino.latitude !== 0 && (
                <MapView
                    style={{ width: width, height: height }}
                    ref={mapRef}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    onMapReady={() => {
                        console.log('onMapReady called');
                        console.log('mapRegionOrigem:', mapRegionOrigem);
                        if (mapRegionOrigem.latitude != null) {
                            console.log('Moving to:', mapRegionOrigem.latitude, mapRegionOrigem.longitude);
                            moverOrigem(mapRegionOrigem);
                        }
                    }}
                >
                    {mapRegionOrigem && <Marker title="Origem" coordinate={mapRegionOrigem}   />}
                    {mapRegionDestino && <Marker   title="Destino" coordinate={mapRegionDestino} />}
                    {mapRegionOrigem && mapRegionDestino && <MapViewDirections
                        origin={mapRegionOrigem}
                        destination={mapRegionDestino}
                        apikey={key.googleApi}
                        strokeColor="#6644ff"
                        strokeWidth={4}
                    />}
                </MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    map: {
        flex: 1,
    }
});

export default MapaAux;
