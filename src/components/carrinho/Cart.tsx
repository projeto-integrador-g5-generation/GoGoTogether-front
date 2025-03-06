import { useContext } from "react";
import { CartContext, Items } from "../../context/CardContext";
import CardCart from "./cardcart/CardCart";

function Cart() {
  const { items, quantidadeItems, valorTotal, limparCart } =
    useContext(CartContext);

  return (
    <>
      <div className="bg-transparent min-h-screen flex flex-col justify-center">
        <h1 className="text-4xl text-center my-4">Carrinho de Compras</h1>

        <h2 className="text-2xl text-center my-4">
          {items.length === 0 ? "O Carrinho está vazio!" : ""}
        </h2>

        <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((item: Items) => (
            <CardCart key={item.id} item={item} />
          ))}
        </div>

        {quantidadeItems > 0 && (
          <div className="container mx-auto my-8 py-4 w-[60vw] grid grid-cols-2 border rounded-lg bg-white text-lg">
            <div className="w-full flex flex-col ml-8">
              <h2 className="text-2xl text-center font-bold py-2">
                Resumo da Compra
              </h2>
              <p className="pb-2">
                <span className="font-semibold">
                  Total de items adicionados:{" "}
                </span>
                {quantidadeItems}
              </p>
              <p>
                <span className="font-semibold">Subtotal: </span>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(valorTotal)}
              </p>
              <hr className="border-xl border-slate-800 py-1" />
              <p>
                <span className="font-semibold">Total: </span>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(valorTotal)}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="rounded text-slate-100 bg-slate-400 hover:bg-slate-800 w-1/2 py-2 mx-auto flex justify-center my-4"
                type="submit"
                disabled={items.length === 0 ? true : false}
                onClick={limparCart}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
