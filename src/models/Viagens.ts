

import UsuarioLogin from "./UsuarioLogin"
import Veiculo from "./Veiculo"


export default interface Viagem{
    id: number
    origem: string
    destino: string
    data_hora_partida: string
    preco: number
    status_viagem: string
    distancia: number
    velocidade_media: number
    duracao_estimada?: number
    veiculo: Veiculo
    usuario: UsuarioLogin
}