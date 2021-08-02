import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}){

  const loading = false;
  const signed = false;

  //página carregando...
  if(loading){
    return(
      <div></div>
    );
  }

  //Se usuário não estiver logado e a rota é privada, redireciona pra tela inicial
  if(!signed && isPrivate){
    return <Redirect to="/" />
  }

  //Se usuário está logado e a rota não é privada, redirecina pro dashboard
  if(signed && !isPrivate){
    return <Redirect to="/dashboard" />
  }

  return(
    <Route 
      {...rest}
      render={ props => (
        <Component {...props} />
      )}
    />
  );
}

//Exemplo de tela não privada: Tela de login