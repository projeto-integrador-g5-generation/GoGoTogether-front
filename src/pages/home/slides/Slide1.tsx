function Slide1() {
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
          Participe de uma jornada justa onde todos concordam com os preços das
          corridas!
        </h1>

        <button className="border p-2 cursor-pointer bg-white rounded  drop-shadow-lg ">
          Viaje conosco
        </button>
      </div>
    </div>
  );
}

export default Slide1;
