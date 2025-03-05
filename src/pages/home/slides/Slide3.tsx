function Slide3() {
  return (
    <div
      id="containerPai"
      className="w-full flex justify-center p-4 bg-black min-h-screen bg-no-repeat bg-cover h-screen"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/50n5k5wmb/close-up-friends-taking-selfie%201.jpg?updatedAt=1741195334196')",
      }}
    >
      <div className="flex flex-col justify-center items-center gap-y-4">
        <h1 className="text-white text-2xl md:text-6xl font-bold drop-shadow-lg text-center">
          Seja bem vindo!
        </h1>
        <p className="text-white  font-bold drop-shadow-lg">
          Vá mais longe compartilhando caminho
        </p>

        <button className="border p-2 bg-white rounded cursor-pointer drop-shadow-lg text-md md:text-2xl">
          Adicionar nova carona
        </button>
      </div>
    </div>
  );
}

export default Slide3;
