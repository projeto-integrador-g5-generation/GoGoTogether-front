import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DNA } from 'react-loader-spinner'
import Viagem from '../../../models/Viagens'
import { AuthContext } from '../../../context/AuthContext'
import { buscar } from '../../../service/Service'
import { ToastAlerta } from '../../../util/ToastAlerta'
import CardViagens from '../cardviagens/CardViagens'

function ListarViagens() {
	const navigate = useNavigate()

	const [viagens, setViagens] = useState<Viagem[]>([])

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJjb3Muc2lsdmFAZW1haWwuY29tIiwiaWF0IjoxNzQxMjc2NTgwLCJleHAiOjE3NDEyODAxODB9.NeyMr9zOXW1RXofPlG54dD_axU2uHOHywAa5RyvrgYU"
	
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
		if (token === null) {
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
				<DNA
					visible={true}
					height="200"
					width="200"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper mx-auto"
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