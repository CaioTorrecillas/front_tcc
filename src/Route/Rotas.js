import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../Paginas/Login";
import CadastroScreen from "../Paginas/Cadastro";
import WelcomePCD from "../Paginas/WelcomePCD/welcomePCD";
import JornadaCard from '../common/jornadaCard'
import WelcomeAux from "../Paginas/WelcomeAux/welcomeAux";
import MapaAux from "../Paginas/MapaAux/mapaAux";

const Stack = createNativeStackNavigator();

function App() {
    return (

        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
            <Stack.Screen name="WelcomePCD" component={WelcomePCD} />
            <Stack.Screen name="WelcomeAux" component={WelcomeAux} />
            <Stack.Screen name="JornadaCard" component={JornadaCard}/>
            <Stack.Screen name="MapaAux" component={MapaAux}/>
        </Stack.Navigator>

    );
}

export default App;