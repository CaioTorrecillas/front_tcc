
import axios from "axios";
import key from '../config/index.json'

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
export function aceitarJornadaService(id_usuario, id_jornada, aceito, desc_aux, name_aux, telefone ){
    console.log("Estou no service de aceitar")
    console.log(id_usuario, id_jornada, aceito, desc_aux, name_aux, telefone )
    console.log(this.URL + 'usuario/' + id_usuario + '/jornada/' + id_jornada + '/aceitar')
    return axios.put(this.URL + 'usuario/' + id_usuario + '/jornada/' + id_jornada + '/aceitar', {
        
        id_usuario: id_usuario,
        id_jornada: id_jornada,
        aceito: aceito,
        desc_aux: desc_aux,
        nome_aux: name_aux,
        telefone_aux: telefone
    }).then((response) => {
        if(response.status == 200){
            alert('Aceitou a jornada');
        }
        return response;
    }).catch(function (error) {
        console.log(error);
        alert('Aceitar jornada falhou');
        throw error; 
    });
}
export function buscarJornadasService() {
    return axios.get(this.URL + 'jornadas')
}
export function terminarJornadaService(id_usuario, id_jornada, aceito, ativo){
    console.log(this.URL + 'usuario/' + id_usuario + '/jornada/' + id_jornada + '/terminar')
    return axios.put(this.URL + 'usuario/' + id_usuario + '/jornada/' + id_jornada + '/terminar', {
        aceito: aceito,
        ativo: ativo
    }).then((response) => {
        if(response.status === 200){
            alert('Jornada terminada com sucesso')
        }
    }).catch(function (error) {
        console.log(error);
        alert('Terminar jornada falhou');
        throw error; 
    });
}
export function buscarJornadasByPCDService(id) {
    return axios.get(this.URL + 'usuario/' + id + '/jornada/ativas').then((response) => {
        if(response == undefined){
            alert('Vc esta sem jornadas')
        }
        return response;
       
    }).catch(function (error) {
        console.log(error);
        setTimeout(()=>{
            alert('Crie uma jornada');
        }, 1200)
       

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
export async function getInfoCEPService(cep) {
    console.log(cep)
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response;
    } catch (error) {
      console.error('Erro ao obter dados pelo CEP:', error);
    }
  }
  export async function getLatElongGoogleService(numero, rua, cidade, estado, cep) {
    const chave = key.googleApi
    try {
      const response = await axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${numero}+,+${rua},+${cidade}+${estado}+${cep}&key=${chave}`);
      return response;
    } catch (error) {
      console.error('Erro ao obter dados pelo CEP:', error);
    }
  }
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