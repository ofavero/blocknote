import { useState } from 'react';
import './index.css';
import { toast, ToastContainer } from "react-toastify";

export const Formulario = () => {

    const [atividades, setAtividades] = useState({
        email: localStorage.getItem('email'),
        atividade: '',
        data: '',
        hora: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valorInput = e => setAtividades({...atividades, [e.target.name]: e.target.value });

    const cadastrarAtividade = async e => {

        e.preventDefault();

        await fetch("http://localhost/crud/atividade.php", {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(atividades)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.erro){
                    setStatus({
                        type: 'erro',
                        mensagem: responseJson.messagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        mensagem: responseJson.messagem
                    });

                }
            });

            if (status.type === 'success') {
                toast.success('Usuario cadastrado com sucesso!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                toast.error(status.mensagem, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }

    }

    return(
        <div className="container-form">
            <form className="form-create" onSubmit={cadastrarAtividade}>
                <label>Atividade:</label><br/>
                <input className="atividade" name="atividade" type="text" placeholder="Ex: Levar o cachorro pra passear" onChange={valorInput} required /><br/>
                <label>Data da Atividade:</label><br/>
                <input className="data" name="data" type="date" onChange={valorInput} required /><br />
                <label>Hora da Atividade:</label><br/>
                <input className="hora" name="hora" type="time" onChange={valorInput} required /><br />
                <label>Descrição da Atividade:</label><br/>
                <input className="descricao" name="descricao" type="text" placeholder="Ex: Dar uma volta no parque" onChange={valorInput} /><br />
                <button className="btn-create" type="submit">Criar Atividade</button>
            </form>
            <ToastContainer />
        </div>
    )
}