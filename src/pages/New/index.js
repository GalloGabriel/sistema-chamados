import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlus } from 'react-icons/fi';
import './new.css';

export default function New(){

  const [assunto, setAssunto] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');
  const [complemento, setComplemento] = useState('');

  function handleRegister(e){
    e.preventDefault();
    alert('CLICASTE');
  }

  return(
    <div>
      <Header />

      <div className="content">
      <Title name="Novo Chamado">
          <FiPlus size={25}/>
        </Title>

        <div className="container">

          <form className="form-profile" onSubmit={handleRegister}> 
            <label>Cliente</label>
            <select>
              <option key={1} value={1}>Sujeito Programador</option>
            </select>

            <label>Assunto</label>
            <select value={assunto} onChange={(e) => setAssunto(e.target.value)} >
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input 
                type="radio" 
                name="radio"
                value="Aberto"
                onChange={ (e) => setStatus(e.target.value) }
                checked={ status === 'Aberto' }
              />
              <span>Em Aberto</span>

              <input 
                type="radio" 
                name="radio"
                value="Progresso"
                onChange={ (e) => setStatus(e.target.value) }
                checked={ status === 'Progresso' }
              />
              <span>Em Progresso</span>

              <input 
                type="radio" 
                name="radio"
                value="Concluido"
                onChange={ (e) => setStatus(e.target.value) }
                checked={ status === 'Concluido' }
              />
              <span>Concluído</span>
            </div>

            <label>Complemento</label>
            <textarea 
              type="text"
              placeholder="Descreva seu chamado (opcional)."
              value={complemento}
              onChange={ (e) => setComplemento(e.target.value) }
            />

            <button type="submit">Salvar</button>

          </form>

        </div>

      </div>
    </div>
  );
}