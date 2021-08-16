import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import { FiMessageCircle, FiPlus } from 'react-icons/fi';
import './dashboard.css';

export default function Dashboard(){

  const [chamados, setChamados] = useState([]);

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Chamados">
          <FiMessageCircle size={25}/>
        </Title>

        {chamados.length === 0 ? (
          <div className="container dashboard">

            <span>Nenhum chamado registrado...</span>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#fff"/>
              Novo Chamado
            </Link>
  
          </div>
        ) : (
          <>
          </>
        ) }

        

      </div>
     
    </div>
  );
}