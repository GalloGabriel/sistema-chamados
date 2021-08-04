import { useState, useEffect, createContext } from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }){

  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect( () => {

    function loadStorage(){
      
      const storageUser = localStorage.getItem('sistemaUser');

      if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);

    }

    loadStorage();

  }, [])

  return(
    <AuthContext.Provider value={{ signed: !!user, user, loading }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;





/*
!!user significa transformar o objeto user em booleano, se tiver algo
dentro do objeto retornará true, caso esteja nullm retornará falso
*/