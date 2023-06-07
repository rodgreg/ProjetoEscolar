import './index.css'
import Logo from './Logo'
import MenuListaHeader from './MenuLista'



function Header () {
    return (
        <div>
            <header id="header">
                <Logo/>
                <MenuListaHeader/>
            </header>
        </div>
    )
}

export default Header