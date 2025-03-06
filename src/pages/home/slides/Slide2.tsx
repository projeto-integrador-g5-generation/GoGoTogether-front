import { Link } from "react-router-dom";

function Slide2() {
  return (
    <div
      id="containerPai"
      className="w-full flex justify-center items-center p-4 bg-black min-h-screen bg-no-repeat bg-cover h-screen"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/50n5k5wmb/photo-1484353371297-d8cfd2895020.avif?updatedAt=1741195736580')",
      }}
    >
      <div className="flex flex-col justify-center w-4/5 items-center gap-5 text-center">
        <h1 className="text-white text-2xl md:text-6xl font-bold drop-shadow-lg">
          Movendo pessoas e conectando caminhos...
        </h1>

        <button className="border  p-2 bg-white cursor-pointer rounded drop-shadow-lg text-md md:text-2xl">
          <Link to={"/viagens"}>Adicionar nova carona</Link>
        </button>
      </div>
    </div>
  );
}

export default Slide2;
