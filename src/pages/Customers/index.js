import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';
import './customers.css';

export default function Customers(){

  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [adress, setAdress] = useState('');


  function handleAdd(e){
    e.preventDefault();
    alert('CLICASTE');
  }
  

  return(
    <div>
      <Header />

      <div className="content">
      <Title name="Clientes">
          <FiUser size={25}/>
        </Title>

        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>

            <label>Nome da Empresa</label>
            <input 
              type="text" 
              value={nomeEmpresa}
              onChange={ (e) => setNomeEmpresa(e.target.value) }
              placeholder="Digite o nome da empresa"
            />

            <label>CNPJ</label>
            <input 
              value={cnpj}
              onChange={ (e) => setCnpj(e.target.value) }
              placeholder="Digite o CNPJ da empresa"
              maxLength="18"
            />

            <label>Endereço</label>
              <input 
              type="text" 
              value={adress}
              onChange={ (e) => setAdress(e.target.value) }
              placeholder="Digite o endereço da empresa"
            />

            <button type="submit">Cadastrar</button>
            
          </form>
        </div>

      </div>
      
    </div>
  );
}