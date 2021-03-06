import "./modal.css";
import { FiX } from 'react-icons/fi';

export default function Modal({conteudo, close}) {

  return(
    <div className="modal">
      
        <div className="container">

          <button className="close" onClick={ close }>
            <FiX size={23} />
            Voltar
          </button>

          <div>
            <h2>Detalhes do Chamado</h2>

            <div className="row">
              <span>Cliente: <p>{conteudo.cliente}</p></span>
            </div>

            <div className="row">
              <span>Assunto: <p>{conteudo.assunto}</p></span>
              <span>Cadastrado em: <p>{conteudo.createdFormated}</p></span>
            </div>

            <div className="row">
              <span>Status: <p style={{ color: '#fff', backgroundColor: conteudo.status === "Aberto" ? '#05487a' : conteudo.status === "Progresso" ? '#bd93f9' :  '#50fa7b' }}>{conteudo.status}</p></span>
            </div>

            {conteudo.complemento !== "" && (
              <>
                <h3>Complemento</h3>
                <p>{conteudo.complemento}</p>
              </>
            )}
          </div>

        </div>

    </div>
  );

}