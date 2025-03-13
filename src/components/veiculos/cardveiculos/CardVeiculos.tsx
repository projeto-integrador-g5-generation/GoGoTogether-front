import { Link } from "react-router-dom";
import Veiculo from "../../../models/Veiculo";
import { CarProfile, Pencil, Trash } from "@phosphor-icons/react";
import { useDictionary } from "../../../context/DictionaryProvider";
import { useTheme } from "../../../context/ThemeContext";

interface CardVeiculoProps {
  veiculo: Veiculo;
}

function CardVeiculos({ veiculo }: CardVeiculoProps) {
  const { translate } = useDictionary();
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "light" ? "bg-white text-black" : "bg-black text-white"
      } flex flex-col rounded-lg overflow-hidden justify-between mx-4 my-10 shadow-lg hover:scale-101 transition-all`}
    >
      <div className="flex justify-between items-center p-2 bg-emerald-700">
        <div className="flex items-center">
          <CarProfile size={28} className="mr-1 fill-blue-200" />
          <p className="text-xl text-left text-white font-bold p-2">
            {translate("veiculos")}
          </p>
        </div>

        <div className="flex justify-center gap-2 items-center">
          <Link to={`/veiculos/editar/${veiculo.id}`}>
            <Pencil
              size={24}
              className="mr-1 fill-white hover:fill-green-500"
            />
          </Link>

          <Link to={`/veiculos/deletar/${veiculo.id}`}>
            <Trash size={24} className="mr-1 fill-white hover:fill-red-300" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-center py-2">
        <img
          src={
            veiculo.foto ||
            "https://ik.imagekit.io/z8ilvvp84p/depositphotos_8681192-stock-illustration-cartoon-car.jpg?updatedAt=1741824982574"
          }
          className="mt-1 h-36 w-auto m-2 object-contain rounded-lg "
          alt={veiculo.modelo}
        />

        <div className="p-4">
          <div className="min-h-12 flex items-center justify-center">
            <p className="text-sm text-center uppercase">
              {veiculo.marca} - {veiculo.modelo}
            </p>
          </div>
          <p className="text-sm text-center p-2">
            {translate("ano")}: {veiculo.ano}
          </p>
          <p className="text-sm text-center p-2">
            {translate("placa")}: {veiculo.placa}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardVeiculos;
