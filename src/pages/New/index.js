import { useState, useEffect, useContext } from 'react';
import firebase from '../../services/firebaseConnection';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './new.css';

export default function New(){

  const { id } = useParams();
  const history = useHistory();

  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [assunto, setAssunto] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');
  const [complemento, setComplemento] = useState('');
  const [idCustomer, setIdCustomer] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect( () => {
      async function loadCustomers(){

        await firebase.firestore().collection('customers')
        .get()
        .then( (snapshot) => {
          
          let lista = [];

          snapshot.forEach( (doc) => {
            lista.push({
              id: doc.id,
              nome: doc.data().nome
            })
          })

          if(lista.length === 0){
            console.log('Nenhum cliente encontrado.')
            setCustomers([
              {
                id: '1',
                nome: 'Freelancer'
              }
            ])
            setLoadCustomers(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomers(false);

          if(id){
            loadId(lista);
          }

        })
        .catch( (error) => {
          console.log('Clientes não encontrados' + error);
          setLoadCustomers(false);
          setCustomers([
            {
              id: '1',
              nome: ''
            }
          ])
        } )

      }

      loadCustomers();
  }, []);



  async function loadId(lista){
    await firebase.firestore().collection('chamados').doc(id)
    .get()
    .then((snapshot) => {
      setAssunto(snapshot.data().assunto);
      setStatus(snapshot.data().status);
      setComplemento(snapshot.data().complemento);

      let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
      setCustomerSelected(index);
      setIdCustomer(true);
    })
    .catch((err) => {
      console.log('ERRO NO ID PASSADO: ', err);
      setIdCustomer(false);
    })
  }


  async function handleRegister(e){
    e.preventDefault();

    if(idCustomer){
      await firebase.firestore().collection('chamados')
      .doc(id)
      .update({
        cliente: customers[customerSelected].nome,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid
      })
      .then( () => {
        toast.success('Chamado editado com sucesso');
        setCustomerSelected(0);
        setComplemento('');
        history.push('/dashboard');
      })
      .catch( (err) => {
        toast.error('Ops! erro ao registrar. tente novamente mais tarde.');
        console.log(err);
      })

      return;
    }
    
    await firebase.firestore().collection('chamados')
    .add({
      created: new Date(),
      cliente: customers[customerSelected].nome,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      status: status,
      complemento: complemento,
      userId: user.uid
    })
    .then( () => {
      toast.success('Chamado registrado com sucesso!');
      setComplemento('');
      setCustomerSelected(0);
    })
    .catch( (error) => {
      toast.error('Erro ao cadastrar chamado :(. Por favor, tente mais tarde')
      console.log('Algo deu errado. ', error);
    })

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

            { loadCustomers ? (
              <input type="text" disabled={true} value="Carregando Cientes..." />
            ) : (
              <select value={customerSelected} onChange={(e)=>setCustomerSelected(e.target.value)} > 
                {customers.map((item, index) => {
                  return(
                    <option key={item.id} value={index} >
                      {item.nome}
                    </option>
                  );
                })}
              </select>
            ) }

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