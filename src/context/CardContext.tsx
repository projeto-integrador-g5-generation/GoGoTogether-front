import { createContext, ReactNode, useState } from "react";
import Viagem from "../models/Viagens";
import { ToastAlerta } from "../util/ToastAlerta";
import { useNavigate } from "react-router-dom";

// Cria o tipo Items, como uma herança do tipo Produto
export interface Items extends Viagem {
  quantidade: number;
}

// Define os Atributos, Estados e Funções que serão compartilhados pelo Contexto
interface CartContextProps {
  adicionarProduto: (produto: Viagem) => void;
  adicionarItem: (id: number) => void;
  removerItem: (id: number) => void;
  limparCart: () => void;
  items: Items[];
  quantidadeItems: number;
  valorTotal: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
  // Inicializa o Estado items, que armazenará os produtos adicionados no carrinho
  const [items, setItems] = useState<Items[]>([]);

  // Calcula o número total de itens no carrinho (quantidade acumulada)
  const quantidadeItems = items.reduce((acc, item) => acc + item.quantidade, 0);

  // Calcula o valor total da compra em Reais
  const valorTotal = items.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  // Função para adicionar produtos ao carrinho
  function adicionarProduto(produto: Viagem) {
    // Localiza o produto no array items e guarda o indice
    const itemIndex = items.findIndex((item) => item.id === produto.id);

    if (itemIndex !== -1) {
      // Produto já está no carrinho, aumenta a quantidade
      const novoCart = [...items];
      novoCart[itemIndex].quantidade += 1;
      setItems(novoCart);
      ToastAlerta("01 item adicionado!", "info");
    } else {
      // Produto não está no carrinho, adiciona novo item
      setItems((itensAtuais) => [
        ...itensAtuais,
        { ...produto, quantidade: 1 },
      ]);
      ToastAlerta("Produto adicionado ao carrinho!", "info");
    }
  }

  function adicionarItem(id: number) {
    // Localiza o produto no array items e guarda o indice
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const novoCart = [...items];
      novoCart[itemIndex].quantidade += 1;
      setItems(novoCart);
      ToastAlerta("01 item adicionado!", "info");
    } else {
      ToastAlerta("Produto não encontrado no carrinho!", "info");
    }
  }

  // Função para remover produtos do carrinho (reduz a quantidade ou remove)
  function removerItem(id: number) {
    // Localiza o produto no array items e guarda o indice
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const novoCart = [...items];

      if (novoCart[itemIndex].quantidade > 1) {
        // Reduz a quantidade do produto
        novoCart[itemIndex].quantidade -= 1;
        setItems(novoCart);
        ToastAlerta("01 Item removido!", "info");
      } else {
        // Remove o produto se a quantidade for 1
        novoCart.splice(itemIndex, 1);
        setItems(novoCart);
        ToastAlerta("Produto removido!", "info");
      }
    }
  }


  const navigate = useNavigate()

  // Função para limpar o carrinho
  function limparCart() {
    ToastAlerta("Compra efetuada com sucesso!", "sucesso");
    navigate('/home')
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        adicionarProduto,
        adicionarItem,
        removerItem,
        limparCart,
        items,
        quantidadeItems,
        valorTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
