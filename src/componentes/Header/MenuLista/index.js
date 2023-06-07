import { Link } from 'react-router-dom'

const botoesDoCabecalho = ["INÍCIO","OCORRÊNCIAS", "COMUNICADOS","CORPO DOCENTE","PROJETO ESCOLAR", "ÁREA RESTRITA"]

function MenuListaHeader () {
    return (
        <ul id="MenuHeaderLista">
               
                {botoesDoCabecalho.map( (texto) => (
                   <Link to={`/${texto.toLowerCase().replace(" ", "").normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`}>
                     <li id="MenuHeaderRota"><p>{texto}</p>
                     {console.log(texto)}
                   </li></Link>

                ))
                }
        </ul>
        )
}

export default MenuListaHeader