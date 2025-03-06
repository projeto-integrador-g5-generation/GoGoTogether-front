import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Grid } from 'react-loader-spinner'
import Viagem from '../../../models/Viagens'
import { AuthContext } from '../../../context/AuthContext'
import { buscar } from '../../../service/Service'
import { ToastAlerta } from '../../../util/ToastAlerta'
import CardViagens from '../cardviagens/CardViagens'

function ListarViagens() {
	const navigate = useNavigate()

	const [viagens, setViagens] = useState<Viagem[]>([])

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token
	
	async function buscarViagems() {
		try {
			await buscar('/viagens', setViagens, {
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
		if (token === '') {
			ToastAlerta('Você precisa estar logado!', 'info')
			navigate('/')
		}
	}, [token])
	  
	  

	  useEffect(() => {
		if (token === null) {
		  ToastAlerta('Você precisa estar logado!', 'info');
		  navigate('/');
		} else {
		  buscarViagems();
		}
	  }, [token]);

	return (
		<>
			{viagens.length === 0 && (
				<Grid
				visible={true}
				height="80"
				width="80"
				color="#4fa94d"
				ariaLabel="grid-loading"
				radius="12.5"
				wrapperStyle={{}}
				wrapperClass="grid-wrapper"
				/>
			)}

			<div
				className="
        bg-gray-200 
          flex 
          justify-center
        "
			>
				<div className="container mx-auto my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{Array.isArray(viagens) && viagens.length > 0 ? (
						viagens.map((viagem) => (
							<CardViagens key={viagem.id} viagem={viagem} />
						))
					) : (
						<p>Não há viagens disponíveis.</p>
					)}
				</div>
			</div>
		</>
	)
}

export default ListarViagens