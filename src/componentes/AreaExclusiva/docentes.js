import { useEffect, useState } from 'react'
import './AreaExclusiva.css'
import { patchProfessor, deleteProfessor, getProfessores, postProfessor} from '../../servicosAPI/docentesAPI'



function ProfessoresTabela () {
    const [professores, setProfessores ] = useState ([])
    const [editar, setEditar] = useState (false)
    const [idParaEditar, setIdParaEditar] = useState(0)
    const [maiorIdDeProfessor,setMaiorIdDeProfessor] = useState([0])
    const [formulariDeCadastroDeProfessor, setFormulariDeCadastroDeProfessor] = useState()
    const [nomeParaAtualizar, setNomeParaAtualizar] = useState('')
    const [materiaParaAtualizar, setMateriaParaAtualizar] = useState('')
    const ExibirCadastroDeNovoProfessor = () => setFormulariDeCadastroDeProfessor(novoCadastroDeProfessor())

    //função para trabalhar assíncrono e ser utilizada pelo useEffect. Sem a função o useEffect não funciona
    async function fetchProfessores () {
        const professoresDaAPI = await getProfessores()
        setProfessores(professoresDaAPI)
    }
    //useEffect faz a ligação assíncrona com o backend
    useEffect(() => {
        fetchProfessores()
    }, [])
    
    async function excluirProfessor(professor) {
        if (window.confirm("Deseja excluir esse professor do cadastro?")) {
            await deleteProfessor(professor)
        } else {
        }
    }

    async function cadastrarProfessor(DadosDoFormulario) {
        DadosDoFormulario.preventDefault();
        const dadosCadastro = DadosDoFormulario.target;
        const requisicao = new FormData(dadosCadastro);
        const requisicaoJson = Object.fromEntries(requisicao.entries());
        requisicaoJson["id"] = maiorIdDeProfessor.toString()
        await postProfessor(requisicaoJson)
        
    }

    async function EditarCadastroProfessor(professor,nomeParaAtualizar,materiaParaAtualizar) {
        const id = professor.id
        const Nome = (nomeParaAtualizar.length > 0) ? `${nomeParaAtualizar}` : professor.Nome
        const Materia = (materiaParaAtualizar.length > 0) ? `${materiaParaAtualizar}` : professor.Materia

        const body = {Nome,
                      Materia,
                      "id":professor.id.toString()}                 
        await patchProfessor (id, body)
        setEditar(false)
        window.location.reload(true);
        
    }

    function novoCadastroDeProfessor() {
        return(
            <div>
                <form method="" onSubmit={cadastrarProfessor}>
                    <label>Nome do professor: 
                        <input type='text' id="Nome" name="Nome" placeholder="Nome do professor"></input>
                    </label>

                    <label>Matéria: 
                        <input type='text' id="materia" name="Materia" placeholder="Matéria do professor"></input>
                    </label>
  
                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>
                    <div>   
                        <button onClick={() => {setFormulariDeCadastroDeProfessor('')}}>Fechar</button>
                    </div>
                    
                </form>
                </div>
          
            )
    }

    function isEditing (professor) {
        if (editar) {
            setEditar(false) 
        } else {
        setEditar(true)
        setIdParaEditar(professor.id)
        }
    }

    //Encontra o maior valor de Id para os professores
    professores.forEach(function(professor){
    if (Number(professor.id) >= Number(maiorIdDeProfessor))  {
        let novoId = Number(professor.id) + 1
        setMaiorIdDeProfessor(novoId)
        }
    })


    return (
        
            <div>
            {formulariDeCadastroDeProfessor}
            <button type='button' name="novoCadastroDeProfessor" onClick={ExibirCadastroDeNovoProfessor}> + Novo Cadastro</button>
            <br/>
            <br/>
            <hr/>
            <br/>
            <table id="TabelaContainer"> 
                <tbody>
                    <tr id="TrContainer">
                        <th>Código</th>
                        <th>Nome do professor</th>
                        <th>Matéria</th>
                        <th>Ação</th>
                        <th>Excluir</th>
                    </tr>
                        {professores.map((professor) =>{
                        return (<tr>
                                    <td>{professor.id}</td>
                                    <td>{editar && professor.id === idParaEditar ?
                                        <input type="text" defaultValue={professor.Nome} onChange={event => {setNomeParaAtualizar(event.target.value)}}/> : professor.Nome}</td>
                                    <td>{editar && professor.id === idParaEditar ?
                                        <input type="text" defaultValue={professor.Materia} onChange={event => {setMateriaParaAtualizar(event.target.value)}}/> : professor.Materia}</td>
                                    <td>{editar && professor.id === idParaEditar ? <p onClick={() => isEditing(professor)}> <p onClick={() => EditarCadastroProfessor(professor, nomeParaAtualizar,materiaParaAtualizar)}>Salvar</p> </p> : <p onClick={() => isEditing(professor)}> Editar</p>}</td>

                                    <td>{editar && professor.id === idParaEditar ? <p>*</p> : <p onClick={() => excluirProfessor(professor)}>Excluir</p>}</td>
                                     {editar && professor.id === idParaEditar ? <td onClick={() => isEditing(professor)}>Fechar</td> : ""}
                                     {onchange}
                                </tr>)
                    })}
                </tbody>
            </table>
            </div>
           


      )}
    
  export default ProfessoresTabela
