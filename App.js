import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Route/Rotas'
import { AuthProvider } from './src/Autenticator/Autenticar';
//import registerNNPushToken from 'native-notify';




function App() {
  //registerNNPushToken(13643, 'o4Mk8DoNS2Ley06Y336k7S');
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;