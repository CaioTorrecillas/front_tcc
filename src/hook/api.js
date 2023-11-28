
import axios from "axios";
import key from '../config/index.json'
import * as Speech from 'expo-speech'
//URL = "http://35.198.61.144/"
URL = "http://192.168.15.42:3000/"
const api = axios.create({
    baseURL: this.URL
})
const loginRetorno = {
    tipoUsuario: '',
    status: ''
}


export function loginUsuarioService(name, senha, voz) {
    return axios.post(this.URL + 'login', {
        name: name,
        senha: senha
    }).then((response) => {
        if(voz){
            Speech.speak('Seu loguin foi feito.', {
                language: 'pt-BR',
                rate: 0.9,
            })
        }
     
        return response;
    }).catch(function (error) {
        console.log(error);
        // alert(error)
        if (voz) {
            Speech.speak('Seu Login falhou. Algum campo está errado', {
                language: 'pt-BR',
                rate: 1.1,
            })
        }



        throw error; // Propaga o erro para quem chama a função
    });
}
export function pegaTokenService(token, id) {
    return axios.put(this.URL + 'token' + '/' + id, {
        token: token
    }).then((response ) => {
        console.log(response)
        if(response.status == 400){
            console.log("Ja tem TOken")
        }
    })

}
export function notificarPCDService(id) {
    return axios.get(this.URL + 'notificar' + '/' + id)
    .then((response ) => {
        console.log(response)
    }).catch(function (error) {
        console.log(error);
        // alert(error)

        alert('Impossivel notificar o usuário') // Propaga o erro para quem chama a função
    });
}
export function chamaUsuarioByIDService(id){
    return axios.get(this.URL + 'usuario/' + id).then((response) => {
        return response;
    }).catch(function (error){
        console.log(error);
    });
}

export function editarUsuarioService(id, name, senha, idade, telefone){
    return axios.put(this.URL + 'usuario-editar/' + id, {
        name: name,
        senha: senha,
        idade: idade,
        telefone: telefone,

    }).then((response) => {
        return response;
    }).catch(function (error){
        console.log(error);
    });
}
export function aceitarJornadaService(id_usuario, id_jornada, aceito, desc_aux, name_aux, telefone) {
    console.log("Estou no service de aceitar")
    console.log(id_usuario, id_jornada, aceito, desc_aux, name_aux, telefone)
    console.log(this.URL + 'usuario/' + id_usuario + '/jornada/' + id_jornada + '/aceitar')
    return axios.put(this.URL + 'usuario/' + id_usuario + '/jornada/' + id_jornada + '/aceitar', {

        id_usuario: id_usuario,
        id_jornada: id_jornada,
        aceito: aceito,
        desc_aux: desc_aux,
        nome_aux: name_aux,
        telefone_aux: telefone
    }).then((response) => {
        if (response.status == 200) {
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
export function terminarJornadaService(id_usuario, id_jornada, aceito, ativo) {
    console.log(this.URL + 'usuario/' + id_usuario + '/jornada/' + id_jornada + '/terminar')
    return axios.put(this.URL + 'usuario/' + id_usuario + '/jornada/' + id_jornada + '/terminar', {
        aceito: aceito,
        ativo: ativo
    }).then((response) => {
        if (response.status === 200) {
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

        return response;

    }).catch(function (error) {
        console.log(error);



    });
}
export function buscarUsuariosService() {
    return axios.get(this.URL + 'usuarios')
}
export function deleteUsuarioService(id) {
    return axios.delete(this.URL + 'usuarios/'+ id )
}
export function mandarNotificacaoService(id, nome_aux) {
    console.log("Notificando usuario" + id)


}
export function deleteJornadaService(idUser, idJornada) {
    return axios.delete(this.URL + 'usuario/'+ idUser + '/jornada/' + idJornada)
}

export function criarJornadaService(id, telefone, cep_origem, cep_destino, desc_aux, desc_pcd, numero_origem, numero_destino) {
    console.log(this.URL + 'usuario/' + id, '/jornada')
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
        return response;
    }).catch(function (error) {
        console.log(error);
        Speech.speak('A criação da sua jornada falhou')
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
export function criarUsuarioService(name, senha, tipo, idade, telefone, voz) {
    console.log(this.URL + 'usuario')
    return axios.post(this.URL + 'usuario', {
        name: name,
        senha: senha,
        tipo: tipo,
        idade: idade,
        telefone: telefone
    }).then((response) => {
        if (voz) {
            Speech.speak('Usuário criado. Clique na seta no canto superior esquerdo para voltar para o Loguin.', {
                language: 'pt-BR',
                rate: 0.9,
            })
        }


        return response;
    }).catch((error) => {
        console.log(error);
    });
}
export default api;