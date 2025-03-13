import { CalendarDots, Minus, Plus } from "@phosphor-icons/react";
import { useContext } from "react";
import { CartContext, Items } from "../../../context/CardContext";
import { formatarData, formatarHora } from "../../../util/FormatarData";
import { Clock, MapPin } from "phosphor-react";
import { useDictionary } from "../../../context/DictionaryProvider";
import { useTheme } from "../../../context/ThemeContext";

interface CardProdutosProps {
  item: Items;
}

function CardCart({ item }: CardProdutosProps) {
  const { adicionarItem, removerItem } = useContext(CartContext);

  const {translate} = useDictionary();

  const { theme } = useTheme();
  

  return (
    <div className={` ${
        theme === "light" ? "bg-white text-black" : "bg-black text-white"
      } flex flex-col rounded-lg overflow-hidden justify-between  shadow-lg hover:scale-101 transition-all`}>
      <div className="p-2">
        <div className="min-h-12 flex items-center justify-start">
          <MapPin size={24} className="fill-red-700" />
          <p className="text-sm text-left uppercase font-semibold">
          {translate('origem')}: {item.origem}
          </p>
        </div>
        <div className="min-h-12 flex items-center justify-start">
          <MapPin size={24} className="fill-green-700" />
          <p className="text-sm text-left uppercase font-semibold">
          {translate('destino')}: {item.destino}
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

        <div className={` ${
        theme === "light" ? "bg-sky-100 text-black" : "bg-gray-700 text-white"
      }flex flex-col  mt-3 p-2 rounded-lg`}>
          <h4 className="text-sm font-semibold py-1">{translate('detalhesCarona')}:</h4>
          <p className="text-sm text-left py-1">
          {translate('distancia')}: {item.distancia} Km
          </p>
          <p className="text-sm text-left py-1">
          {translate('velocidadeMedia')}: {item.velocidade_media} Km²
          </p>
          <p className="text-sm text-left py-1">
          {translate('tempoEstimado')}: {item.duracao_estimada}
          </p>
        </div>

        <div className={` ${
        theme === "light" ? "bg-green-200 text-black" : "bg-gray-600 text-white"
      } flex flex-col items-start  mt-3 p-2 rounded-lg`}>
          <h4 className="text-sm font-semibold py-1">{translate('veiculo')}:</h4>

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

      <div className="py-2">
        <div className="p-2">
          <h3 className="text-xl text-center font-bold uppercase">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.preco)}
          </h3>
          <h4 className="my-2 text-center">
            <span className="font-semibold">{translate('quantidade')}:</span> {item.quantidade}
          </h4>
        </div>
      </div>
      <div className="flex flex-wrap">
        <button
          className="w-1/2 text-slate-100 bg-emerald-500 hover:bg-emerald-700 flex items-center p-1 justify-center cursor-pointer transition-all"
          onClick={() => adicionarItem(item.id)}
        >
          <Plus size={32} />
        </button>
        <button
          className="w-1/2 text-slate-100 bg-red-400 hover:bg-red-600 flex items-center p-1 justify-center cursor-pointer transition-all"
          onClick={() => removerItem(item.id)}
        >
          <Minus size={32} />
        </button>
      </div>
    </div>
  );
}

export default CardCart;
