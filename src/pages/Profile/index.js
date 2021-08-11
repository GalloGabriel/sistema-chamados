import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import './profile.css';
import { toast } from 'react-toastify'
import avatar from '../../assets/avatar.png';

export default function Profile(){

  const { user, logout, setUser, storageUser } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e){
    if(e.target.files[0]){
      const image = e.target.files[0];

      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        setImageAvatar(image);
        
        //Cria o preview da imagem na pagina
        setAvatarUrl(URL.createObjectURL(e.target.files[0]));
      }else{
        alert('Envie uma imagem JPEG ou PNG');
        setImageAvatar(null);
        return null;
      }
    }

  }

  //enviando imagem pro banco
  async function handleUpload(){
    const currentUid = user.uid;

    const uploadTask = await firebase.storage()
    .ref(`images/${currentUid}/${imageAvatar.name}`)
    .put(imageAvatar)
    .then( async () => {
      console.log('imagem enviada com sucesso!');

      await firebase.storage().ref(`images/${currentUid}`)
      .child(imageAvatar.name).getDownloadURL()
      .then( async (url) => {
        let urlFoto = url;

        await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
          avatarUrl: urlFoto,
          nome: nome
        })
        .then( () => {
          let data = {
            ...user,
            avatarUrl: urlFoto,
            nome: nome
          };

          setUser(data);
          storageUser(data);
          toast.success('Usuário alterado com sucesso!');
        })
      })
    })

  }

  async function handleSave(e){
    e.preventDefault();
    
    //Altera somente o nome
    if(imageAvatar === null && nome !== ''){
      await firebase.firestore().collection('users')
      .doc(user.uid)
      .update({
        nome: nome
      })
      .then( () => {
        let data = {
          ...user,
          nome: nome
        };

        setUser(data);
        storageUser(data);
        toast.success('Usuário alterado com sucesso!');
      })
      .catch( (error) => {
        console.log(error);
        toast.error('erro ao cadastrar usuário.');
      })
    }

    //Alterar nome e imagem do avatar
    else  if(nome !== '' && imageAvatar !== null){
      handleUpload()
    }

  }

  return(
    <div>
      <Header />
      
      <div className="content">
        <Title name="Meu Perfil">
          <FiSettings size={25}/>
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25}/>
              </span>

              {/* input type file aceita somente documentos do tipo imagem */}
              <input type="file" accept="image/*" onChange={handleFile} /> 
              <br/>
              {avatarUrl === null ? 
                <img src={avatar} alt="Foto do perfil" width="250" height="250" />
                :
                <img src={avatarUrl} alt="Foto do perfil" width="250" height="250" />
              }
            </label>

            <label>Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>

            <label>Email</label>
            <input type="email" value={email} disabled={true}/>

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container"> 
            <button onClick={ () => logout() } className="logout-btn">Sair</button>
        </div>
      </div>
    </div>
  );
}