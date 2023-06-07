import axios from "axios";

const ocorrenciasAPI = axios.create({baseURL:"http://localhost:8000/cef20/"})


async function getOcorrencias(){
    const response = await ocorrenciasAPI.get('/ocorrencias/')
    return response.data
}


async function deleteOcorrencia(ocorrencia) {
    await ocorrenciasAPI.delete(`/ocorrencias/${ocorrencia.id}`)
    alert(`Ocorrência foi excluída com sucesso`)
    window.location.reload(true);
}


async function postOcorrencia(requisicaoJson) {
    await ocorrenciasAPI.post('/ocorrencias/',requisicaoJson)
    alert("Ocorrência cadastrado com sucesso")
    window.location.reload(true);
}

async function patchOcorrencia(id, body) {
    await ocorrenciasAPI.patch(`/ocorrencias/${id}`,body)
    alert("Cadastro atualizado com sucesso")
}

export {
    getOcorrencias,
    deleteOcorrencia,
    postOcorrencia,
    patchOcorrencia
}
