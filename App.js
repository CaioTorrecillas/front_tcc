import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Route/Rotas'
import { AuthProvider } from './src/Autenticator/Autenticar';
import registerNNPushToken from 'native-notify';


//const Stack = createNativeStackNavigator();

function App() {
  registerNNPushToken(13503, 'K5gt3U83l0l5Vseg9sq0pJ');
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;