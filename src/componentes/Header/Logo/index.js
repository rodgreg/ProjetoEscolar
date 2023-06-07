import logo from '../../../imagens/logo.png'

function Logo () {
    return (
      <div id="LogoDiv">
        <a href="https://www.instagram.com/cef20cei/" target="_blank" rel="noreferrer">
            <img
            src={logo}
            id="LogoImagem"
            alt="Aqui é exibido a Logo da Escola"
            /></a>
        <p id="LogoTexto">Centro de Ensino Fundamental 20 - Ceilândia</p>
      </div>
    )
}

export default Logo