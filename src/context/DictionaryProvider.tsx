import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type DictionaryType = {
  [key: string]: string[];
};


const DictionaryContext = createContext<{
  translate: (key: string) => string;
  setLanguage: (lang: number) => void;
  language: number;
} | null>(null);


const dictionary: DictionaryType = {
    viagens: ["Viagens", "Trips", "Viajes"],
    perfil: ['Perfil', 'Profile','Perfil'],
    carrinho: ['Carrinho', 'Cart', 'Carro'],
    veiculos: ["Veiculos", "Vehicles", "Vehículos"],
    acessarRedes: ["Acesse nossas redes sociais", "Access our social networks", "Accede a nuestras redes sociales"],
    sair: ["Sair", "Logout", "Cerrar sesión"],
    nome: ["Nome", "Name", "Nombre"],  
    email: ["Email", "Email", "Correo electrónico"],
    caronaCompartilhada: ["Carona compartilhada GoGoTogether", "Ride-sharing GoGoTogether", "Viaje compartido GoGoTogether"],
    slide1: ["Participe de uma jornada justa onde todos concordam com os preços das corridas!", "Join a fair journey where everyone agrees on ride prices!", "Únete a un viaje justo donde todos acuerdan los precios de los viajes!"],
    slide2: ["Movendo pessoas e conectando caminhos...", "Moving people and connecting paths...", "Moviendo personas y conectando caminos..."],  
    slide3: ["Vá mais longe compartilhando caminho", "Go further by sharing the journey", "Llega más lejos compartiendo el camino"],
    slide3BoasVindas: ["Seja bem-vindo!", "Welcome!", "¡Bienvenido!"],
    slide1Botao: ["Viaje conosco", "Travel with us", "Viaja con nosotros"],  
    slide2Botao: ["Adicionar nova carona", "Add new ride", "Agregar nuevo viaje"],
    cadastrarVeiculo: ["Cadastrar Veículo", "Register Vehicle", "Registrar vehículo"],
    veiculoNaoEncontrado: ["Não encontrado", "Not found", "No encontrado"],
    pesquisar: ["Pesquisar", "Search", "Buscar"],
    ano: ["Ano", "Year", "Año"],  
    placa: ["Placa", "License Plate", "Matrícula"],
    certezaApagarVeiculo: ["Você tem certeza de que deseja apagar o veículo a seguir?", "Are you sure you want to delete the following vehicle?", "¿Está seguro de que desea eliminar el siguiente vehículo?"],
    deletarVeiculo: ["Deletar Veículo", "Delete Vehicle", "Eliminar vehículo"],
    sim: ["Sim", "Yes", "Sí"],  
    nao: ["Não", "No", "No"],
    modelo: ["Modelo", "Model", "Modelo"],  
    marca: ["Marca", "Brand", "Marca"],  
    cor: ["Cor", "Color", "Color"],  
    categoria: ["Categoria", "Category", "Categoría"],  
    foto: ["Foto", "Photo", "Foto"],  
    combustivel: ["Combustível", "Fuel", "Combustible"],  
    capacidade: ["Capacidade", "Capacity", "Capacidad"],  
    assentosDisponiveis: ["Assentos Disponíveis", "Available Seats", "Asientos disponibles"],
    cadastrar: ["Cadastrar", "Register", "Registrar"],
    seletorCombustivel: ["Selecione um tipo de combustível", "Select a fuel type", "Seleccione un tipo de combustible"],
    seletorCategoria: ["Selecione uma categoria", "Select a category", "Seleccione una categoría"],
    fraseModelo: ["Adicione o modelo do veiculo", "Add the vehicle model", "Agrega el modelo del vehículo"],  
    fraseMarca: ["Adicione a marca do veiculo", "Add the vehicle brand", "Agrega la marca del vehículo"],  
    fraseAno: ["Adicione o ano do veiculo", "Add the vehicle year", "Agrega el año del vehículo"],  
    fraseCor: ["Adicione a cor do veiculo", "Add the vehicle color", "Agrega el color del vehículo"],  
    frasePlaca: ["Adicione a placa do Veículo", "Add the vehicle license plate", "Agrega la matrícula del vehículo"],  
    fraseFoto: ["Adicione a foto do Veiculo", "Add the vehicle photo", "Agrega la foto del vehículo"],  
    fraseCapacidade: ["Adicione a capacidade do Veículo", "Add the vehicle capacity", "Agrega la capacidad del vehículo"],  
    fraseAssentosDisponiveis: ["Adicione a quantidade de assentos disponíveis", "Add the available seats", "Agrega los asientos disponibles"],
    gasolina: ["Gasolina", "Gasoline", "Gasolina"],  
    etanol: ["Etanol", "Ethanol", "Etanol"],  
    diesel: ["Diesel", "Diesel", "Diésel"],  
    flex: ["Flex", "Flex", "Flex"],  
    hibrido: ["Híbrido", "Hybrid", "Híbrido"],  
    eletrico: ["Elétrico", "Electric", "Eléctrico"],  
    sedan: ["Sedan", "Sedan", "Sedán"],  
    suv: ["SUV", "SUV", "SUV"],  
    outro: ["Outro", "Other", "Otro"],  
    cadastrarViagem: ["Cadastrar Viagem", "Register Trip", "Registrar Viaje"],
    origem: ["Origem", "Origin", "Origen"],  
    destino: ["Destino", "Destination", "Destino"],  
    detalhesCarona: ["Detalhes da Carona", "Ride Details", "Detalles del Viaje"],  
    distancia: ["Distância", "Distance", "Distancia"],  
    velocidadeMedia: ["Velocidade Média", "Average Speed", "Velocidad Media"],  
    tempoEstimado: ["Tempo Estimado", "Estimated Time", "Tiempo Estimado"],  
    veiculo: ["Veículo", "Vehicle", "Vehículo"],  
    contratar: ["Contratar", "Hire", "Contratar"],
    deletarViagem: ["Deletar Viagem", "Delete Trip", "Eliminar Viaje"],  
    confirmacaoDeletar: ["Você tem certeza de que deseja apagar a carona a seguir?", "Are you sure you want to delete the following ride?", "¿Estás seguro de que deseas eliminar el siguiente viaje?"],  
    carona: ["Carona", "Ride", "Viaje"],  
    criadoPor: ["Criado por", "Created by", "Creado por"],  
    dataHorarioPartida: ["Data e Horário da Partida", "Departure Date and Time", "Fecha y Hora de Salida"],  
    valorTrajeto: ["Valor do Trajeto", "Trip Cost", "Costo del Viaje"],  
    status: ["Status", "Status", "Estado"],  
    velocidade: ["Velocidade", "Speed", "Velocidad"],  
    selecioneVeiculo: ["Selecione um Veículo", "Select a Vehicle", "Seleccione un Vehículo"],  
    cancelada: ["Cancelada", "Canceled", "Cancelada"],  
    concluida: ["Concluída", "Completed", "Completada"],  
    emAndamento: ["Em Andamento", "In Progress", "En Curso"],  
    agendada: ["Agendada", "Scheduled", "Programada"],  
    localPartida: ["Insira o local da partida", "Enter the departure location", "Ingrese el lugar de salida"],
    localDestino: ["Insira o destino", "Enter the destination", "Ingrese el destino"],
    valorServico: ["Adicione o valor do serviço", "Enter the service cost", "Ingrese el costo del servicio"],
    carrinhoDeCompras: ["Carrinho de Compras", "Shopping Cart", "Carrito de Compras"],
    totalItemsAdicionados: ["Total de items adicionados", "Total items added", "Total de artículos añadidos"],
    resumoCompra: ["Resumo da Compra", "Purchase Summary", "Resumen de la compra"],
    subtotal: ["Subtotal", "Subtotal", "Subtotal"],
    total: ["Total", "Total", "Total"],
    finalizarCompra: ["Finalizar Compra", "Complete Purchase", "Finalizar compra"],
    quantidade: ["Quantidade", "Quantity", "Cantidad"],
    texto1: ["O GoGoTogether é um sistema de caronas que conecta motoristas e passageiros para viagens econômicas, seguras e sustentáveis. Com um sistema intuitivo, os usuários podem oferecer ou buscar caronas de forma simples e confiável. O sistema facilita a comunicação entre usuários, permitindo reservas, pagamentos e avaliações, tornando cada viagem mais segura e acessível!", "GoGoTogether is a carpooling system that connects drivers and passengers for economical, safe, and sustainable trips. With an intuitive system, users can offer or search for rides in a simple and reliable way. The system facilitates communication between users, allowing reservations, payments, and reviews, making each trip safer and more accessible!", "GoGoTogether es un sistema de carpooling que conecta conductores y pasajeros para viajes económicos, seguros y sostenibles. Con un sistema intuitivo, los usuarios pueden ofrecer o buscar viajes de manera simple y confiable. El sistema facilita la comunicación entre los usuarios, permitiendo reservas, pagos y valoraciones, haciendo cada viaje más seguro y accesible!"],
    texto2: ["A equipe do GoGoTogether é formada por desenvolvedores apaixonados por tecnologia e inovação. Cada um dos membros trouxe suas habilidades e dedicação para tornar o projeto uma solução eficiente para a gestão de usuários. O projeto foi desenvolvido com foco na usabilidade e experiência do usuário, oferecendo uma plataforma responsiva e moderna para otimizar a gestão de treinos personalizados,  tornando a experiência mais eficiente e acessível.","The GoGoTogether team is made up of developers who are passionate about technology and innovation. Each of the members brought their skills and dedication to make the project an efficient solution for user management. The project was developed with a focus on usability and user experience, offering a responsive and modern platform to optimize the management of personalized training, making the experience more efficient and accessible.","El equipo de GoGoTogether está formado por desarrolladores apasionados por la tecnología y la innovación. Cada uno de los integrantes aportó sus habilidades y dedicación para hacer del proyecto una solución eficiente para la gestión de usuarios. El proyecto se desarrolló centrándose en la usabilidad y la experiencia de usuario, ofreciendo una plataforma responsiva y moderna para optimizar la gestión de la formación personalizada, haciendo la experiencia más eficiente y accesible."],
    equipe: ["Equipe", "Team", "Equipo"],
    sobre: ["Sobre", "About", "Acerca de"],
    conhecaEquipe: ["Conheça Nossa Equipe","Meet Our Team","Conozca a nuestro equipo"],
    facaLogin: ["Faça login para ver sua atividade recente", "Log in to see your recent activity", "Inicia sesión para ver tu actividad reciente"],
    vejaMais: ["Veja viagens anteriores, sugestões personalizadas, recursos de suporte e muito mais.", "See past trips, personalized suggestions, support resources, and more.", "Ve viajes anteriores, sugerencias personalizadas, recursos de soporte y mucho más."],
    facaLoginConta: ["Faça login na sua conta", "Log in to your account", "Inicia sesión en tu cuenta"],
    semConta: ["Não tem uma conta? Cadastre-se", "Don't have an account? Sign up", "¿No tienes una cuenta? Regístrate"],
    oferecaCaronas: ["Ofereça caronas quando quiser e ganhe de acordo com suas viagens.", "Offer rides whenever you want and earn based on your trips.", "Ofrece viajes cuando quieras y gana según tus viajes."],
    ganheDinheiroCaronas: ["Ganhe dinheiro oferecendo caronas no horário que você definir. Use seu próprio carro e conecte-se com passageiros de forma fácil e segura.", "Earn money by offering rides at the times you choose. Use your own car and connect with passengers easily and safely.", "Gana dinero ofreciendo viajes en el horario que elijas. Usa tu propio coche y conéctate con pasajeros de manera fácil y segura."],
    comecar: ["Começar", "Start", "Empezar"],
    jaTemConta: ["Já tem uma conta? Fazer login", "Already have an account? Log in", "¿Ya tienes una cuenta? Iniciar sesión"],
    oferecaCaronasNecessidades: ["Ofereça caronas quando quiser e ganhe conforme suas necessidades.", "Offer rides whenever you want and earn according to your needs.", "Ofrece viajes cuando quieras y gana según tus necesidades."],
    ganheDinheiroPreferir: ["Ganhe dinheiro oferecendo caronas no horário que preferir. Use seu próprio carro e conecte-se com passageiros de forma prática e segura.", "Earn money by offering rides at the time you prefer. Use your own car and connect with passengers easily and safely.", "Gana dinero ofreciendo viajes en el horario que prefieras. Usa tu propio coche y conéctate con pasajeros de manera práctica y segura."],
    maisFacilApp: ["É mais fácil pelo app", "It's easier through the app", "Es más fácil a través de la app"],
    baixeApp: ["Baixe o app", "Download the app", "Descarga la app"],
    leiaQR: ["Leia o código QR para baixar o app", "Scan the QR code to download the app", "Lee el código QR para descargar la app"],
    baixeAppParceiro: ["Baixe o app de parceiro", "Download the partner app", "Descarga la app de socio"]
}


interface DictionaryProviderProps {
  children: ReactNode;
}

// Criamos o Provider para compartilhar as traduções com os componentes
export const DictionaryProvider = ({ children }: DictionaryProviderProps) => {
  const [language, setLanguage] = useState<number>(() => {
    return Number(localStorage.getItem("language")) || 0;
  });

  // Quando o idioma mudar, salvamos no navegador para lembrar depois
  useEffect(() => {
    localStorage.setItem("language", language.toString());
  }, [language]);

  // Função que traduz palavras com base no idioma atual
  const translate = (key: string): string => {
    return dictionary[key] ? dictionary[key][language] : key;
  };

  return (
    <DictionaryContext.Provider value={{ translate, setLanguage, language}}>
      {children}
    </DictionaryContext.Provider>
  );
};

// Criamos um Hook para facilitar o uso da tradução nos componentes
export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary deve ser usado dentro de um DictionaryProvider");
  }
  return context;
};

export default DictionaryProvider