import Modal from 'react-modal';
import { useState } from "react";
import './index.css';
import { Formulario } from './formulario/index';

Modal.setAppElement('#root');

export const ModalButton = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    return(
        <div className="actions">
                <button onClick={openModal} className="create-activity">Criar Atividade</button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Adicionar Atividade"
                    overlayClassName="modal-overlay"
                    className="modal-content"
                >
                    <div className="fechar">
                        <div className="line">
                            <span>____________________</span>
                        </div>
                        <div className="btn-close">
                            <button onClick={closeModal} className="close">X</button>
                        </div>
                    </div>
                    <Formulario />
                    <div className="footer"/>
                </Modal>
            </div>
    )
}