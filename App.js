import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Route/Rotas'
import { AuthProvider } from './src/Autenticator/Autenticar';



//const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;