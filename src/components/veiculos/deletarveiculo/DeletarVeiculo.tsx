import { useContext, useEffect, useState } from "react"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"
import Veiculo from "../../../models/Veiculo"
import { AuthContext } from "../../../context/AuthContext"
import { buscar, deletar } from "../../../service/Service"
import { ToastAlerta } from "../../../util/ToastAlerta"


function DeletarVeiculo() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [veiculo, setVeiculo] = useState<Veiculo>({} as Veiculo)

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aW5pY2l1c0BlbWFpbC5jb20iLCJpYXQiOjE3NDEyMTE3MzksImV4cCI6MTc0MTIxNTMzOX0.SAzxeNSeiDRUFk98JYPAjliDzuJDvglT6d59nim9HQE"

    async function buscarPorId(id: string) {
        try {
            await buscar(`/veiculos/${id}`, setVeiculo, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao localizar o Veículo!', 'erro')
                retornar()
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
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarVeiculo() {
        setIsLoading(true)

        try {
            await deletar(`/veiculos/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Veículo Excluído com Sucesso!', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao Excluir o Veículo!', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/veiculos")
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center py-4'>Deletar Veículo</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o veículo a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-cyan-900 text-white font-bold text-2xl'>
                    Veículo
                </header>
                
                <p className='p-4 text-2xl bg-white h-full'>{veiculo.modelo}</p>

                <div className="flex">
                    <button
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className='w-full text-slate-100 bg-teal-500 hover:bg-teal-700
                         flex items-center justify-center'
                        onClick={deletarVeiculo}
                    >
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarVeiculo