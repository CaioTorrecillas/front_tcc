import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Route/Rotas'
import { AuthProvider } from './src/Autenticator/Autenticar';




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