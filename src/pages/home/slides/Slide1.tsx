import { Link } from "react-router-dom";
import { useDictionary } from "../../../context/DictionaryProvider";

function Slide1() {
  const { translate } = useDictionary();

  return (
    <div
      id="containerPai"
      className="w-full flex justify-center p-8 bg-black min-h-screen bg-no-repeat bg-cover h-screen"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/50n5k5wmb/unnamed-2021-12-22T162414.814.jpg?updatedAt=1741197238816')",
      }}
    >
      <div className="flex flex-col gap-5 w-full justify-center items-center text-center">
        <h1 className="text-white text-2xl md:text-6xl   text-center  font-bold w-full   drop-shadow-lg">
        {translate('slide1')}
        </h1>

        <button className="border p-2 cursor-pointer bg-white rounded  drop-shadow-lg ">
          <Link to={"/viagens"}>{translate('slide1Botao')}</Link>
        </button>
      </div>
    </div>
  );
}

export default Slide1;
