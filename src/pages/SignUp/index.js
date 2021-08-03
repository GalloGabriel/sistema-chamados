import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function SignUp() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e){
    e.preventDefault(); //para não atualizar a página
    alert('CLICASTES')
  }

  return (
    <div className="container-center">

      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="logotipo da empresa"/>
        </div>

        <form onSubmit={ handleSubmit }>
          <h1>Cadastre-se</h1>

          <input type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={ (e) => setNome(e.target.value) }/>

          <input type="text" 
          placeholder="digite seu email" 
          value={email}
          onChange={ (e) => setEmail(e.target.value)}
           />

          <input type="password" 
          placeholder="digite sua senha"
          value={password}
          onChange={ (e) => setPassword(e.target.value) }
           />

          <button type="submit">Cadastrar</button>
        </form>

        <Link to="/">Já possui uma conta? Entre</Link>
      </div>

    </div>
  );
}

export default SignUp;
