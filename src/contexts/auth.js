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

  //Fazendo login do usuário
  async function signIn(email, password){
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( async (value) => {
      let uid = value.user.uid;

      //pegando informações do banco de dados
      const userProfile = await firebase.firestore().collection('users')
      .doc(uid).get()

      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        avatarUrl: userProfile.data().avatarUrl,
        email: value.user.email
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);

    })
    .catch( (error) => {
      console.log(error);
      setLoadingAuth(false);
    })

  }

  //Criando novo usuário
  async function signUp(email, password, name){
    setLoadingAuth(true);
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async (value) => {
      let uid = value.user.uid;

      await firebase.firestore().collection('users')
      .doc(uid).set({
        nome: name,
        avatarUrl: null
      })

      .then( () => {
        let data = {
          uid: uid,
          nome: name,
          email: value.user.email,
          avatarUrl: null
        };
  
        setUser(data);
        storageUser(data);
        setLoadingAuth(false);

      })

    })
    .catch( (error) => {
      console.log(error);
      setLoadingAuth(false);
    })

  }

  //Função para salvar os dados no localStorage
  function storageUser(data){
    localStorage.setItem('sistemaUser', JSON.stringify(data));    
  }

  //finalizando sessão do usuário
  async function logout(){
    await firebase.auth().signOut();

    //limpando localStorage
    localStorage.removeItem('sistemaUser');

    //limpando nossa state user
    setUser(null);
  }

  return(
    <AuthContext.Provider
     value={{ 
       signed: !!user, 
       user, 
       loading, 
       signUp,
       logout,
       signIn,
       loadingAuth 
      }}
     >
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;





/*
!!user significa transformar o objeto user em booleano, se tiver algo
dentro do objeto retornará true, caso esteja nullm retornará falso
*/