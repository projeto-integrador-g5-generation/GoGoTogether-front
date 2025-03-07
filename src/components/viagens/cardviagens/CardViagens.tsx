import {CalendarDots,Clock,MapPin,Pencil,Trash,
} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import Viagem from '../../../models/Viagens'
import { formatarData, formatarHora } from '../../../util/FormatarData'
import { formatarMoeda } from '../../../util/FormatarMoeda'
import { useContext } from 'react'
import { CartContext } from '../../../context/CardContext'
import { useDictionary } from '../../../context/DictionaryProvider'



interface CardViagemProps {
	viagem: Viagem
}

function CardViagens({ viagem }: CardViagemProps) {

	const {translate} = useDictionary();
	

	const { adicionarProduto } = useContext(CartContext)

	return (
		<div className="flex flex-col rounded-lg overflow-hidden justify-between mx-4 my-10 hover:shadow-lg bg-white shadow-lg hover:scale-101 transition-all">
			<div className="flex justify-between items-center p-2 bg-emerald-700">
				<div className="flex items-center">
					<img
						src={viagem.usuario?.foto || "https://ik.imagekit.io/ajt99blle/9815472-Photoroom.png?updatedAt=1740150724984"}
						alt={viagem.usuario?.nome}
						className="border-transparent rounded-full w-8 h-8"
					/>
					<p className="text-base text-left text-white font-semibold p-2">
						{viagem.usuario?.nome}
					</p>
				</div>

				<div className="flex justify-center gap-2 items-center">
				     <Link to={`/viagens/editar/${viagem.id}`}>
						 <Pencil
							size={24}
							className="mr-1 fill-white hover:fill-green-500"
						/>
					</Link>

					<Link to={`/viagens/deletar/${viagem.id}`}>
						{viagem.id ? (
							<Trash size={24} className="mr-1 fill-white hover:fill-red-300" />
						) : (
							<span>Erro: ID inválido</span>
						)}
					</Link>


				</div>
			</div>

			<div className="flex flex-col justify-center py-2">
				<div className="p-2">
					<div className="min-h-12 flex items-center justify-start">
						<MapPin size={24} className="fill-red-700" />
						<p className="text-sm text-left uppercase font-semibold">
						{translate('origem')}: {viagem.origem}
						</p>
					</div>
					<div className="min-h-12 flex items-center justify-start">
						<MapPin size={24} className="fill-green-700" />
						<p className="text-sm text-left uppercase font-semibold">
						{translate('destino')}: {viagem.destino}
						</p>
					</div>

					<div className="flex py-2 gap-4">
						<div className="flex items-center gap-1">
							<CalendarDots size={24} />
							<p>{formatarData(viagem.data_hora_partida)}</p>
						</div>
						<div className="flex items-center gap-1">
							<Clock size={24} />
							<p>{formatarHora(viagem.data_hora_partida)}</p>
						</div>
					</div>

					<h3 className="py-2 text-xl text-left font-bold uppercase">
						{formatarMoeda(viagem.preco)}
					</h3>

					<div className="flex flex-col bg-emerald-100 mt-3 p-2 rounded-lg">
						<h4 className="text-sm font-semibold py-1">
						{translate('detalhesCarona')}:
						</h4>
						<p className="text-sm text-left py-1">
						{translate('distancia')}: {viagem.distancia} Km
						</p>
						<p className="text-sm text-left py-1">
						{translate('velocidadeMedia')}: {viagem.velocidade_media} Km²
						</p>
						<p className="text-sm text-left py-1">
						{translate('tempoEstimado')}: {viagem.duracao_estimada} min
						</p>
					</div>

					<div className="flex flex-col items-start bg-emerald-100 mt-3 p-2 rounded-lg">
						<h4 className="text-sm font-semibold py-1">{translate('veiculo')}:</h4>

						<div className="flex items-center">
							<img
								src={viagem.veiculo?.foto}
								alt={viagem.veiculo?.modelo}
								className="border-transparent rounded-lg w-20 h-16 object-fit"
							/>
							<p className="text-base text-left text-black font-semibold p-2">
								{viagem.veiculo?.modelo}
							</p>
						</div>
					</div>
				</div>
			</div>

			<button
				className="w-full text-white bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center py-2 cursor-pointer transition-all"
				onClick={() => adicionarProduto(viagem)}
			>
				{translate('contratar')}
			</button>
		</div>
	)
}

export default CardViagens