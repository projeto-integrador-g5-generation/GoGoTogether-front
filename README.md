# 🌐 **GoGoTogether - Frontend **

<br />

<div align="center">
    <img src="https://ik.imagekit.io/ecspdivlw/Readme/logo.jpg?updatedAt=1741879537783" title="logo " width="50%"/>
</div>

<br /><br />

## 1. Descrição

O **GoGoTogether** é uma plataforma web de caronas compartilhadas, que conecta motoristas e passageiros que desejam dividir viagens de forma econômica e sustentável. Desenvolvido com React e TypeScript, o sistema oferece uma interface intuitiva e responsiva, garantindo uma experiência de usuário fluida. Utilizamos Tailwind CSS para estilização e APIs REST para comunicação com o back-end, desenvolvido em NestJS.

------

## 2. Recursos

- **Cadastro e Gerenciamento de Usuários**: Permite a criação, edição e remoção de perfis de passageiros e motoristas.
- **Busca e Filtro de Viagens**:Usuários podem buscar viagens por origem, destino, data e preço.
- **Gerenciamento de Viagens**: Administradores podem criar, editar e excluir ofertas de caronas, definindo preço, quantidade de vagas e horário de partida.
- **Reserva de Caronas:**:  Passageiros podem reservar assentos e visualizar detalhes sobre a viagem e o motorista.
- **Interface Responsiva e Intuitiva**: Desenvolvida com um design moderno, adaptado para diferentes dispositivos e tamanhos de tela.
- **Exibição com Cards**: Organização visual eficiente para facilitar a navegação e interação dos usuários.
- **Página Sobre**: Apresentação dos integrantes que desenvolveram o projeto.

------

## 3. Protótipo e Capturas de Tela


<div align="center">
    <img src="https://ik.imagekit.io/ecspdivlw/Readme/home.png?updatedAt=1741879237698" title="Home" width="50%"/>
</div>
<div align="center">
    <img src="https://ik.imagekit.io/ecspdivlw/Readme/viagens.png?updatedAt=1741879236912" title="Viagens" width="50%"/>
</div>
<div align="center">
    <img src="https://ik.imagekit.io/ecspdivlw/Readme/sobre.png?updatedAt=1741879237671" title="Sobre" width="50%"/>
</div>
<div align="center">
    <img src="https://ik.imagekit.io/ecspdivlw/Readme/Perfil.png?updatedAt=1741879238013" title="Perfil" width="50%"/>
</div>
<div align="center">
    <img src="https://ik.imagekit.io/ecspdivlw/Readme/veiculos.png?updatedAt=1741879238198" title="veiculos" width="50%"/>
</div>
<div align="center">
    <img src="https://ik.imagekit.io/ecspdivlw/Readme/carrinho.png?updatedAt=1741879238444" title="Carrinho" width="50%"/>
</div>

<br />

------

## 4. Tecnologias

| Item                         | Descrição  |
| ---------------------------- | ---------- |
| **Servidor**                 | Node JS    |
| **Linguagem de programação** | TypeScript |
| **Biblioteca**               | React JS   |
| **Build**                    | Vite       |
| **Framework de Estilização** | Tailwind   |

---

## 5. Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v16+)
- [yarn](https://yarnpkg.com/)
- [API GoGoTogether](https://github.com/projeto-integrador-g5-generation/GoGoTogether) 

---

## 6. Configuração e Execução

1. Clone o repositório do Projeto
2. Instale as dependências: `yarn`
3. Clone o repositório do Projeto Backend: [Link](https://github.com/projeto-integrador-g5-generation/GoGoTogether)
4. Siga as instruções de **Configuração e Execução** descritas no README do Projeto Backend
5. Adicione o endereço de execução do projeto na variável de ambiente **VITE_API_URL**, no projeto React
6. Execute o Projeto React: `yarn dev`
7. A aplicação React estará disponível no endereço: `http://localhost:5173`

---

## 7. Estrutura do Projeto

```plaintext
src/
│
├── components/       # Componentes reutilizáveis
├── models/           # Estrutura de dados da aplicação-
├── pages/            # Páginas da aplicação
├── services/         # Integração com a API (requisições HTTP)
├── utils/            # Funções auxiliares (alerts)
└── App.tsx           # Componente principal da aplicação
```

---

## 8. Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch com a sua feature (`git checkout -b minha-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça um push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request