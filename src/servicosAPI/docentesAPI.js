import axios from "axios";

const professoresAPI = axios.create({baseURL:"http://localhost:8000/cef20/"})

async function getProfessores() {
    const response = await professoresAPI.get('/corpodocente/')
    return response.data
}

async function deleteProfessor(professor) {
    await professoresAPI.delete(`/corpodocente/${professor.id}`)
    alert(`O cadastro do professor ${professor.Nome} foi excluído`)
    window.location.reload(true);
}

async function postProfessor(requisicaoJson) {
    await professoresAPI.post('/corpodocente/',requisicaoJson)
    alert("Professor cadastrado com sucesso")
    window.location.reload(true);
}

async function patchProfessor(id, body) {
    await professoresAPI.patch(`/corpodocente/${id}`,body)
    alert("Cadastro atualizado com sucesso")
}

export {
    getProfessores,
    deleteProfessor,
    postProfessor,
    patchProfessor
}
