import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import './index.css';

export const Cadastrar = () => {

    const [usuarios, setUsuarios] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valorInput = e => setUsuarios({ ...usuarios, [e.target.name]: e.target.value });

    const cadastrarUsuario = async e => {
        e.preventDefault();

        await fetch("http://localhost/crud/cadastrar.php", {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarios)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.erro) {
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

    return (
        <div className="content">
            <div className="global-register">
                <div className="text-content">
                    <h4>Cadastre-se Aqui!</h4>
                </div>
                <form className="form-register" onSubmit={cadastrarUsuario}>
                    <input className="input-register" type="text" name="nome" placeholder="Seu Nome" onChange={valorInput} required /><br />
                    <input className="input-register" type="email" name="email" placeholder="Seu Email" onChange={valorInput} required /><br />
                    <input className="input-register" type="password" id="senha" name="senha" placeholder="Sua Senha" onChange={valorInput} required /><br />
                    <br />
                    <button className="button-register" type="submit">Cadastrar</button>
                </form>
                <a href="/login"><button className="button-login" type="submit">Login</button></a>
            </div>
            <ToastContainer />
        </div>
    );
}

