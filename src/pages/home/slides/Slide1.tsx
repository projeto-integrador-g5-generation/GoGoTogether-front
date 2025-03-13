import { Link } from "react-router-dom";
import { useDictionary } from "../../../context/DictionaryProvider";

function Slide1() {
  const { translate } = useDictionary();

  return (
    <div
      id="containerPai"
      className="w-full flex justify-center h-full bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/50n5k5wmb/unnamed-2021-12-22T162414.814.jpg?updatedAt=1741197238816')",
      }}
    >
      <div className="w-full flex justify-center bg-slide p-4">
        <div className="flex flex-col gap-5 w-full justify-center items-center text-center">
          <h1 className="text-white text-2xl md:text-6xl  text-center  font-bold w-full  drop-shadow-lg max-w-8xl">
            {translate("slide1")}
          </h1>

          <button className="p-2 cursor-pointer bg-white rounded drop-shadow-lg hover:scale-105 hover:bg-gray-100  transition-all text-md md:text-2xl mt-10">
            <Link to={"/viagens"}>{translate("slide1Botao")}</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slide1;
