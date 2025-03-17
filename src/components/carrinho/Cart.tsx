import { useContext } from "react";
import { CartContext, Items } from "../../context/CardContext";
import CardCart from "./cardcart/CardCart";
import { useDictionary } from "../../context/DictionaryProvider";
import { useTheme } from "../../context/ThemeContext";

function Cart() {
  const { items, quantidadeItems, valorTotal, limparCart } =
    useContext(CartContext);

  const { translate } = useDictionary();
  const {theme} = useTheme();

  return (
    <>
      <div className="bg-transparent min-h-screen flex flex-col justify-center">
        <h1 className="text-4xl text-center my-4 text-white font-semibold">
          {translate("carrinhoDeCompras")}
        </h1>

        <h2 className="text-2xl text-center my-4 text-white font-semibold">
          {items.length === 0 ? "O Carrinho está vazio!" : ""}
        </h2>

        <div className="container mx-auto my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {items.map((item: Items) => (
            <CardCart key={item.id} item={item} />
          ))}
        </div>

        {quantidadeItems > 0 && (
          <div className={`container mx-auto my-8 py-4 w-[60vw] grid grid-cols-2 border rounded-lg ${theme == 'light' ? 'bg-white text-black' : 'bg-black text-white'} text-lg`}>
            <div className="w-full flex flex-col ml-8">
              <h2 className="text-2xl text-center font-bold py-2">
                {translate("resumoCompra")}
              </h2>
              <p className="pb-2">
                <span className="font-semibold">
                  {translate("totalItemsAdicionados")}:{" "}
                </span>
                {quantidadeItems}
              </p>
              <p>
                <span className="font-semibold">{translate("subtotal")}: </span>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(valorTotal)}
              </p>
              <hr className="border-xl border-slate-800 py-1" />
              <p>
                <span className="font-semibold">{translate("total")}: </span>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(valorTotal)}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="rounded text-white bg-emerald-500 hover:bg-emerald-800 w-1/2 py-2 mx-auto flex justify-center my-4 cursor-pointer transition-all shadow-md"
                type="submit"
                disabled={items.length === 0 ? true : false}
                onClick={limparCart}
              >
                {translate("finalizarCompra")}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
