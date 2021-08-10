import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import './header.css';
import avatar from '../../assets/avatar.png';
import { FiHome, FiUser, FiSettings } from "react-icons/fi";


export default function Header(){

  const { user } = useContext(AuthContext)

  return(
    <div className="sidebar">
      <div>
        <img 
          src={user.avatarUrl === null ? avatar : user.avatarUrl} 
          alt="Foto de perfil"
        />
        <span className="nomeUser">{user.nome}</span>
      </div>

      <Link to="/dashboard">
        <FiHome size={24}/>
        Chamados
      </Link>

      <Link to="/customers">
        <FiUser size={24}/>
        Clientes
      </Link>

      <Link to="/settings">
        <FiSettings size={24}/>
        Configurações
      </Link>
      
    </div>
  );
}