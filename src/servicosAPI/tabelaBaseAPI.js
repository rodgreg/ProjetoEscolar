import axios from "axios";
const tabelaBaseDaAPI = axios.create({baseURL:"http://localhost:8000/cef20/"})

async function getTabelaBaseDaAPI () {
    const response = await tabelaBaseDaAPI.get('/tabelasbase/')
    return response.data
}

export  {
    getTabelaBaseDaAPI
}