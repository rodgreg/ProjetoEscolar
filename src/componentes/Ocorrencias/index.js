import './registroOcorrencias.css'
import { getOcorrencias, deleteOcorrencia, postOcorrencia, patchOcorrencia } from '../../servicosAPI/ocorrenciasAPI'
import { getTabelaBaseDaAPI } from '../../servicosAPI/tabelaBaseAPI'
import { getProfessores } from '../../servicosAPI/docentesAPI'
import { useEffect, useState } from 'react'




function RegistroOcorrencias () {
    const [ocorrencias, setOcorrencias] = useState([])
    const [tabelasBase, setTabelasBase] = useState([])
    const [professores, setProfessores] = useState([])
    const [listaDeProfessores, setListaDeProfessores] = useState ([])
    const [componenteChamado, setComponenteChamado] = useState('')
    const [tipoDeOcorrenciaMarcada, setTipoDeOcorrenciaMarcada] = useState('')
    const [maiorIdDeOcorrencia,setMaiorIdDeOcorrencia] = useState([0])
    const [turmas, setTurmas] = useState([])
    const [ocorrenciasDisciplinares, setOcorrenciasDisciplinares] = useState ([])
    const [ocorrenciasPedagogicas, setOcorrenciasPedagogicas] = useState([])
    const hoje = new Date()
    const data = hoje.toLocaleDateString()

 
    async function fetchDados () {
        const professoresDaAPI = await getProfessores()
        const ocorrenciasDaAPI = await getOcorrencias()
        const tabelasBaseDaAPI = await getTabelaBaseDaAPI()
        setProfessores(professoresDaAPI)
        setOcorrencias(ocorrenciasDaAPI)
        setTabelasBase(tabelasBaseDaAPI)

    } 

    useEffect (() => {
        fetchDados();
        },[])

    function PopulaListasComAstabelasBase () {
    
        setTurmas(tabelasBase[0].Turmas)
        setOcorrenciasDisciplinares(tabelasBase[0].Ocorrencias_disciplinares)
        setOcorrenciasPedagogicas(tabelasBase[0].Ocorrencias_pedagogicas)
        let professoresNomes = [];
        
            professores.map((professor) => {
                return (professoresNomes.push(professor.Nome)
            )}
            )
        setListaDeProfessores(professoresNomes)

    }
    
        
    //Encontra o maior valor de Id para os professores
    ocorrencias.forEach(function(ocorrencia){
        if (Number(ocorrencia.id) >= Number(maiorIdDeOcorrencia))  {
            let novoId = Number(ocorrencia.id) + 1
            setMaiorIdDeOcorrencia(novoId)
            }
        })
    

    async function cadastrarOcorrencia(DadosDoFormulario) {
        DadosDoFormulario.preventDefault();
        const dadosCadastro = DadosDoFormulario.target;
        const requisicao = new FormData(dadosCadastro);
        const requisicaoJson = Object.fromEntries(requisicao.entries());
        requisicaoJson["id"] = maiorIdDeOcorrencia.toString()
        await postOcorrencia(requisicaoJson)
    }

    function TipoDeOcorrencia(OpcoesDoRadio) {
        OpcoesDoRadio.forEach(opcao => {
            (opcao.checked) ? setTipoDeOcorrenciaMarcada(opcao.value) : console.log('');         
        });
        
    }

    function TipoDeOcorrenciaASerExibida(tipoDeOcorrenciaMarcada) {
    
            switch(tipoDeOcorrenciaMarcada) {
                case "disciplinar":
                   return( 
                        
                    <div id="formContainerDiv">
                        <label>Ocorrência disciplinar:</label>
                        <select name="Ocorrencia" id="FormCombobox" >
                        <option></option>
                        {exibeOcorrenciasDisciplinaresNoFormulario()}
                        </select>
                    </div>);
        
                case "pedagogica":
                    return (
                    <div id="formContainerDiv">
                        <label>Ocorrência Pedagógica:</label>
                        <select name="Ocorrencia" id="FormCombobox">
                        <option></option>
                        {exibeOcorrenciasPedagogicasNoFormulario()}
                        </select>
                    </div>);

                default:
                    return (<div>
                                <label for="Ocorrencia">Descrição da ocorrência:</label>
                                <textarea id="Ocorrencia" name="Ocorrencia" row="4" cols="50" /></div>)
}
}

    function exibeTurmasNoFormulario () {
        return(
            turmas.map((turma) => {
                return(<option>{turma}</option>)})
        )
    }

    function exibeOcorrenciasDisciplinaresNoFormulario () {
        return(
            ocorrenciasDisciplinares.map((ocorrencia) => {
                return(<option>{ocorrencia}</option>)})
        )
    }

    function exibeOcorrenciasPedagogicasNoFormulario () {
        return(
            ocorrenciasPedagogicas.map((ocorrencia) => {
                return(<option>{ocorrencia}</option>)})
        )
    }
    
    function exibeProfessoresNoFormulario () {
        return(
            listaDeProfessores.map((nomes) => {
                return(<option>{nomes}</option>)})
        )
    }
    function Teste () {
    
    }


function formularioDeOcorrencias () {
            return(
            <section>
            <div>
                <br/>
                <h1>Registro de ocorrências</h1>
                <h2>Formulário para cadastro de novas ocorrências</h2>
                <br/>
                <button onClick={PopulaListasComAstabelasBase}>Carregar dados</button>
            </div>
                <section name="formularioDeOcorrencias" id="formularioDeOcorrencias">
                    <form id="formContainer" onSubmit={cadastrarOcorrencia}>
                        <div id="formContainerDiv">
                            <label>Data da ocorrência:*</label>
                            <input type="date" name="Data_da_Ocorrencia" required/>
                        </div>
                        <div id="formContainerDiv">
                                <label>Turma:*</label>
                                <select name="Turma" id="FormCombobox" required>
                                    <option></option>
                                    {exibeTurmasNoFormulario()}
                                </select>
                        </div>
                        <div id="formContainerDiv">
                                <label>Aluno:*</label>
                                <input name="Aluno" type="text" required/>
                        </div>
                        <div id="formContainerDiv">
                                <label>Professor:*</label>
                                <select name="Professor" id="FormCombobox" required>
                                    <option></option>
                                    {exibeProfessoresNoFormulario()}
                                </select>
                        </div>
                        <div id="formContainerDiv">
                            <label> Tipo de ocorrência:*</label>
                            <input type="radio" name="Tipo_ocorrencia" value="disciplinar" onClick={() => {
                                const OpcoesDoRadio = document.getElementsByName('Tipo_ocorrencia');
                                TipoDeOcorrencia(OpcoesDoRadio)
                                }}/><label id="FormRadio">Disciplinar</label>

                            <input type="radio" name="Tipo_ocorrencia" value="pedagogica" onClick={() => {
                                const OpcoesDoRadio = document.getElementsByName('Tipo_ocorrencia');
                                TipoDeOcorrencia(OpcoesDoRadio)}}/><label id="FormRadio">Pedagógica</label>

                            <input type="radio" name="Tipo_ocorrencia" value="outra" onClick={() => {
                                const OpcoesDoRadio = document.getElementsByName('Tipo_ocorrencia');
                                TipoDeOcorrencia(OpcoesDoRadio)}}/><label id="FormRadio">Outra</label>
                        </div>

                        {TipoDeOcorrenciaASerExibida(tipoDeOcorrenciaMarcada)}

                        <div id="formContainerDiv">
                            <label for="observacoes">Observações:</label>
                            <textarea id="observacoes" name="Observacoes" row="4" cols="50"></textarea>
                        </div>
                        <div id="formContainerDiv">
                                <label>Preenchido por:</label>
                                <select name="Preenchido_por" id="FormCombobox" required>
                                    <option>-</option>
                                    <option>Direção</option>
                                    <option>Professor</option>
                                    <option>Assitência</option>
                                    <option>Monitor</option>
                                </select>
                        </div>
                        <div id="formContainerDiv">
                                <label>Data do registro:</label>
                                <input type="text" name="Data_registro" defaultValue={data.toString()} />
                        </div>
                        <div>
                            <button type="submit" id="FormButton"> Enviar</button>
                        </div>
                    </form>
                </section>
            </section>
            )
}

function menuDeOcorrencias () {
    const opcoesDoMenu = ["Cadastrar", "Visualizar"]
    return (
        <ul id="ulDoMenu">
            
                {opcoesDoMenu.map((item) => {
                    return(<div id="menu"><li id="liDoMenu"><p onClick={() => setComponenteChamado(item)}>{item}</p></li>
                            </div>)
                })}
            
        </ul>
    )
}


    return (
        <body>
        <section>
            {menuDeOcorrencias()}
            <br/>
            <hr/>
            {(componenteChamado === "Cadastrar") ? formularioDeOcorrencias() :'' }


            
        </section>
   
        </body>
    )
}

export default RegistroOcorrencias