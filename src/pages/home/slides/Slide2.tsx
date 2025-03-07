import { Link } from "react-router-dom";
import { useDictionary } from "../../../context/DictionaryProvider";

function Slide2() {
  const { translate } = useDictionary();

  return (
    <div
      id="containerPai"
      className="w-full flex justify-center items-center bg-black min-h-screen bg-no-repeat bg-cover h-screen"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/50n5k5wmb/photo-1484353371297-d8cfd2895020.avif?updatedAt=1741195736580')",
      }}
    >
      <div className="w-full flex justify-center bg-slide min-h-screen">
        <div className="flex flex-col justify-center w-4/5 items-center gap-5 text-center">
          <h1 className="text-white text-2xl md:text-6xl font-bold drop-shadow-lg">
            {translate("slide2")}
          </h1>

          <button className="p-2 cursor-pointer bg-white rounded drop-shadow-lg hover:scale-110 transition-all text-md md:text-2xl mt-10">
            <Link to={"/viagens"}>{translate("slide2Botao")}</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slide2;
