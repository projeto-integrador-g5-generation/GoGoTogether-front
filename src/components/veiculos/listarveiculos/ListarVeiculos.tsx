import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Veiculo from '../../../models/Veiculo'
import CardVeiculos from '../cardveiculos/CardVeiculos'
import { buscar } from '../../../service/Service'
import { AuthContext } from '../../../context/AuthContext'
import { ToastAlerta } from '../../../util/ToastAlerta'
import { ClipLoader } from 'react-spinners'

function ListarVeiculos() {
    const navigate = useNavigate()

    const [veiculos, setVeiculos] = useState<Veiculo[]>([])
    const [listaVeiculo, setListaVeiculo] = useState(veiculos);
    const [nomeVeiculo, setNomeVeiculo] = useState("");

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aW5pY2l1c0BlbWFpbC5jb20iLCJpYXQiOjE3NDEyMTE3MzksImV4cCI6MTc0MTIxNTMzOX0.SAzxeNSeiDRUFk98JYPAjliDzuJDvglT6d59nim9HQE"

    async function buscarVeiculos() {
        try {
            await buscar('/veiculos', setVeiculos, {
                headers: {
                    Authorization: token,
                },
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === null) {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarVeiculos();
    }, []);

    useEffect(() => {
        const veiculosEncontrados = veiculos.filter((c: Veiculo) =>
            c.modelo.toLocaleLowerCase().includes(nomeVeiculo.toLocaleLowerCase())
        );
        setListaVeiculo(veiculosEncontrados);
    }, [veiculos, nomeVeiculo]);

    return (
        <>
            {veiculos.length === 0 && (
                <ClipLoader
                    size={200}
                    color={"#123abc"}
                    loading={true}
                    cssOverride={{ margin: '0 auto' }}
                />
            )}
    
            {/* Container principal para a barra de pesquisa e botão de cadastro */}
            <div className="bg-gray-200 flex justify-center p-4">
                <div className="w-full max-w-6xl flex items-center gap-4">
                    {/* Barra de pesquisa com botão de lupa */}
                    <div className="flex-1 flex items-center bg-white rounded-lg shadow-lg border border-gray-400">
                        <input
                            className="w-full px-4 py-2 h-9 focus:outline-none"
                            type="search"
                            placeholder="Pesquisar"
                            id="busca"
                            name="busca"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNomeVeiculo(e.target.value)
                            }
                            required
                        />
                        <button
                            type="button"
                            className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-lg focus:outline-none"
                        >
                            🔍
                        </button>
                    </div>
    
                    {/* Botão de cadastrar veículo */}
                    <button
                        className="cursor-pointer px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-800 focus:outline-none font-bold"
                        onClick={() => navigate("/cadastrarveiculo")} // Ajuste a rota conforme necessário
                    >
                        Cadastrar Veículo
                    </button>
                </div>
            </div>
    
            {/* Listagem de veículos */}
            {listaVeiculo.length === 0 ? (
                <div className="flex justify-center items-center p-4 w-full min-h-[90vh]">
                    <p className="text-3xl text-black text-center">
                        Veículo não encontrado.
                    </p>
                </div>
            ) : (
                <div className="container mx-auto my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {listaVeiculo.map((veiculo) => (
                        <CardVeiculos key={veiculo.id} veiculo={veiculo} />
                    ))}
                </div>
            )}
        </>
    );
}

export default ListarVeiculos