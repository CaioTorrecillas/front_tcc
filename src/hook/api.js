
import axios from "axios";
URL = "http://192.168.15.42:3000/"
const api = axios.create({
    baseURL: this.URL
})
const loginRetorno = {
    tipoUsuario: '',
    status: ''
}

export function loginUsuarioService(name, senha) {
    return axios.post(this.URL + 'login', {
      name: name,
      senha: senha
    }).then((response) => {
        return response;
    }).catch(function (error) {
        console.log(error);
        alert('Login falhou. Verifique seu nome de usuário e senha.');
        throw error; // Propaga o erro para quem chama a função
    });
}

export function buscarJornadasService() {
    return axios.get(this.URL + 'jornadas')
}

export function buscarJornadasByPCDService(id) {
    return axios.get(this.URL + 'usuario/' + id + '/jornada/ativas').then((response) => {
        return response;
    }).catch(function (error) {
        console.log(error);
        alert('Comece criando uma jornada');

    });
}
export function buscarUsuariosService() {
    return axios.get(this.URL + 'usuarios')
}
export function criarJornadaService(id, telefone, cep_origem, cep_destino, desc_aux, desc_pcd, numero_origem, numero_destino) {
    console.log(this.URL + '/usuario/' + id, '/jornada')
    console.log(cep_origem);
    return axios.post(this.URL + 'usuario/' + id + '/jornada', {
        cep_origem: cep_origem,
        cep_destino: cep_destino,
        telefone_pcd: telefone,
        desc_aux: desc_aux,
        desc_pcd: desc_pcd,
        numero_origem: numero_origem,
        numero_destino: numero_destino
    }).then((response) => {
        if(response.status == 200){
            alert('Criar jornada deu certo');
        }
        return response;
    }).catch(function (error) {
        console.log(error);
        alert('Criar jornada falhou');
        throw error; // Propaga o erro para quem chama a função
    });
}
export async function getCoordinatesFromCEPAndNumeroService (cep, numero) {
    const address = `${cep} ${numero}`; // Combine o CEP e o número em um único endereço
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      );
      if (response.status === 200 && response.data.length > 0) {
        const firstResult = response.data[0];
        const latitude = parseFloat(firstResult.lat);
        const longitude = parseFloat(firstResult.lon);
        console.log(response)
        return { latitude, longitude };
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter coordenadas:', error);
      return null;
    }
};
  
export function criarUsuarioService(name, senha, tipo, idade, telefone) {
    console.log(this.URL + '/usuario')
    return axios.post(this.URL + 'usuario', {
        name: name,
        senha: senha,
        tipo: tipo,
        idade: idade,
        telefone: telefone
    }).then((response) => {
        if(response.status == 200){
            alert('Usuario criado');
        }
        return response;
    }).catch(function (error) {
        console.log(error);
        alert('Criar usuario falhou');
        throw error; // Propaga o erro para quem chama a função
    });
}
export default api;