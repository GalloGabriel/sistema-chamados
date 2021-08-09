import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';

export default function Dashboard(){

  const { logout } = useContext(AuthContext);

  return(
    <div>
      <Header/>

      <h1>Página Dashboard</h1>
      <button onClick={ () => logout() }>Fazer logout</button>
    </div>
  );
}