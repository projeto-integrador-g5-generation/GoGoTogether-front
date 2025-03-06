import { CalendarDots, Minus, Plus } from "@phosphor-icons/react";
import { useContext } from "react";
import { CartContext, Items } from "../../../context/CardContext";
import { formatarData, formatarHora } from "../../../util/FormatarData";
import { Clock, MapPin } from "phosphor-react";
import { formatarMoeda } from "../../../util/FormatarMoeda";

interface CardProdutosProps {
  item: Items;
}

function CardCart({ item }: CardProdutosProps) {
  const { adicionarItem, removerItem } = useContext(CartContext);

  return (
    <div className="flex flex-col rounded-lg overflow-hidden justify-between bg-white">
      <div className="p-2">
        <div className="min-h-12 flex items-center justify-start">
          <MapPin size={24} className="fill-red-700" />
          <p className="text-sm text-left uppercase font-semibold">
            Partida: {item.origem}
          </p>
        </div>
        <div className="min-h-12 flex items-center justify-start">
          <MapPin size={24} className="fill-green-700" />
          <p className="text-sm text-left uppercase font-semibold">
            Destino: {item.destino}
          </p>
        </div>

        <div className="flex py-2 gap-4">
          <div className="flex items-center gap-1">
            <CalendarDots size={24} />
            <p>{formatarData(item.data_hora_partida)}</p>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={24} />
            <p>{formatarHora(item.data_hora_partida)}</p>
          </div>
        </div>
        <h3 className="py-2 text-xl text-left font-bold uppercase">
          {formatarMoeda(item.preco)}
        </h3>

        <div className="flex flex-col bg-sky-100 mt-3 p-2 rounded-lg">
          <h4 className="text-sm font-semibold py-1">Detalhes da Carona:</h4>
          <p className="text-sm text-left py-1">
            Distância: {item.distancia} Km
          </p>
          <p className="text-sm text-left py-1">
            Velocidade Média: {item.velocidade_media} Km²
          </p>
          <p className="text-sm text-left py-1">
            Tempo Estimado: {item.duracao_estimada}
          </p>
        </div>

        <div className="flex flex-col items-start bg-green-200 mt-3 p-2 rounded-lg">
          <h4 className="text-sm font-semibold py-1">Veículo:</h4>

          <div className="flex items-center">
            <img
              src={item.veiculo?.foto}
              alt={item.veiculo?.modelo}
              className="border-transparent rounded-lg w-20 h-16 object-fit"
            />
            <p className="text-base text-left text-black font-semibold p-2">
              {item.veiculo?.modelo}
            </p>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="p-4">
          <p className="text-sm text-center uppercase">{item.nome}</p>
          <h3 className="text-xl text-center font-bold uppercase">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.preco)}
          </h3>
          <h4 className="my-2 text-center">
            <span className="font-semibold">Quantidade:</span> {item.quantidade}
          </h4>
        </div>
      </div>
      <div className="flex flex-wrap">
        <button
          className="w-1/2 text-slate-100 bg-blue-500 hover:bg-blue-700 flex items-center justify-center py-2"
          onClick={() => adicionarItem(item.id)}
        >
          <Plus size={32} />
        </button>
        <button
          className="w-1/2 text-slate-100 bg-red-500 hover:bg-red-700 flex items-center justify-center py-2"
          onClick={() => removerItem(item.id)}
        >
          <Minus size={32} />
        </button>
      </div>
    </div>
  );
}

export default CardCart;
