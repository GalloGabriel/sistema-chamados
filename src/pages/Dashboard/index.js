import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function Dashboard(){

  const { logout } = useContext(AuthContext);

  return(
    <div>
      <h1>Página Dashboard</h1>
      <button onClick={ () => logout() }>Fazer logout</button>
    </div>
  );
}