import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

    const navigate = useNavigate();

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const [login, setLogin] = useState({
        email: '',
        senha: ''
    });

    const valorInput = e => setLogin({ ...login, [e.target.name]: e.target.value });

    const logarUsuario = async e => {
        e.preventDefault();

        await fetch("http://localhost/crud/login.php", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(login)
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
                    window.localStorage.setItem('email', login.email);
                    navigate('/dashboard');
                }
            });
            if (status.type === 'erro') {
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
        <div className="container">
            <div className="container-second">
                <div className="global-login">
                    <div className="text">
                        <h4>Seja Bem-Vindo!</h4>
                    </div>
                    <form onSubmit={logarUsuario} className="form">
                        <input className="input" type="email" name="email" placeholder="Seu email" onChange={valorInput} required /><br />
                        <input className="input" type="password" name="senha" placeholder="Sua senha" onChange={valorInput} required /><br />
                        <button className="btn" type="submit">Logar</button>
                    </form>
                    <a className="a" href="/cadastrar"><button className="button">Cadastre-se</button></a>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}