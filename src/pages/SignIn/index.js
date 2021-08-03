import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signin.css';
import logo from '../../assets/logo.png';

function SignIn() {

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
          <h1>Entrar</h1>

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

          <button type="submit">Acessar</button>
        </form>

        <Link to="/register">Criar uma conta</Link>
      </div>

    </div>
  );
}

export default SignIn;
