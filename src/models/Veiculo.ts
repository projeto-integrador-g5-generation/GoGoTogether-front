import Viagem from "./Viagem"

export default interface Veiculo{
    id: number
    modelo: string
    marca: string
    ano: number
    cor: string
    categoria: string
    foto: string    
    placa: string
    combustivel: string
    capacidade: number
    assentos_disponiveis: number
    criado_em: string
    atualizado_em: string
    viagem?: Viagem;
}