import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
    const [vagas, setVagas] = useState([]);

    useEffect(() => {
        api.get("/vagas/")
            .then(response => {
                setVagas(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar vagas:", error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Vagas</h1>
            <ul>
                {vagas.map(vaga => (
                    <li key={vaga.id}>
                        <h2>{vaga.titulo}</h2>
                        <p>{vaga.descricao}</p>
                        <strong>Salário: R$ {vaga.salario}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}
