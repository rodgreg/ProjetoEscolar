import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './componentes/Header'
import Home from './Rotas/Home'
import OcorrenciasRota from './Rotas/Ocorrencias';
import ComunicadosRota from './Rotas/Comunicados';
import ProjetoEscolarRota from './Rotas/ProjetoEscolar';
import CorpoDocenteRota from './Rotas/CorpoDocente';
import AreaRestritaRota from './Rotas/AreaRestrita';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/inicio' element={ <Home/> } />
          <Route path='/ocorrencias' element= { <OcorrenciasRota/> }/>
          <Route path='/comunicados' element= { <ComunicadosRota/> }/>
          <Route path='/corpodocente' element= { <CorpoDocenteRota/> }/>
          <Route path='/projetoescolar' element= { <ProjetoEscolarRota/> }/>
          <Route path='/arearestrita' element= { <AreaRestritaRota/> }/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
