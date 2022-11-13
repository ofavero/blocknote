import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '../Login';
import './index.css';
import { ModalButton } from './components/modal/index';
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";


export const Dashboard = () => {

    function refreshPage() {
        window.location.reload(false);
      }

    const email = localStorage.getItem('email');

    const [usuarios, setUsuarios] = useState({
        email: email
    });

    const [data, setData] = useState([]);

    const valorInput = e => setUsuarios({ ...usuarios, [e.target.name]: e.target.value });

    const listarItems = async () => {

         fetch("http://localhost/crud/listarAtividade.php", {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarios)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.records)
            });
    }

    useEffect(() => {
        listarItems();
    });


    const navigate = useNavigate();

    const LogOut = () => {
        localStorage.setItem('email', Login.email);
        localStorage.clear();
        navigate(`/login`);
        window.location.reload();
    }

    const [auth, setAuth] = useState('');
    useEffect(() => {
        var auth = localStorage.getItem('email');
        setAuth(auth);
    }, []);
    if (auth === null) {
        navigate('/login');
    }

    return (
        <>
            <header className="header">
                <div className="page">
                    <span>Dashboard</span>
                </div>
                <div className="logout">
                    <Link to='' onClick={LogOut} className="link">Sair</Link>
                </div>
            </header>
            
            <div className="table">
                <button className="btn-refresh" onClick={refreshPage}>Refresh</button>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Atividade</th>
                            <th>Data</th>
                            <th>Horário</th>
                            <th>Adicional</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(atividade => (
                            <tr key={atividade.idatividade}>
                                <td>{atividade.idatividade}</td>
                                <td>{atividade.atividade}</td>
                                <td>{atividade.data}</td>
                                <td>{atividade.hora}</td>
                                <td>{atividade.descricao}</td>
                                <td><button className="delete"><BsTrash /></button> <button className="edit"><BsPencilSquare /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalButton />
            <input className="email" name="email" value={localStorage.getItem('email')} onChange={valorInput} />
        </>
    );
}