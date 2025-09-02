# Trybers Online Store (TOS)

Uma aplicação de e-commerce bem simples, desenvolvida com **React**, foi um dos meus primeiros projetos práticos de Front-end. O objetivo principal foi solidificar conceitos de componentização, gerenciamento de estado, consumo de APIs e criação de layouts responsivos.
> (OBS: realizei algumas pequenas melhorias mais recentes, mas sem mudar a proposta inicial ou aparência)

<h3>
   ✨ <a href="https://warywise.github.io/online-store/" target="_blank" rel="noopener noreferrer"><strong>Acesse a demonstração ao vivo aqui!</strong></a> ✨
</h3>

## 📸 Preview da Aplicação

<table>
<tr>
<td align="center">Estado inicial ou busca sem resultados</td>
<td align="center">Página inicial com produtos</td>
</tr>
<tr>
<tr>
<td>
   <img src="https://github.com/user-attachments/assets/59b9c531-7b76-497c-9501-6dbec323004b" alt="Tela inicial da loja com a mensagem 'Nenhum produto foi encontrado'" width="500px">
</td>
<td>
   <img src="https://github.com/user-attachments/assets/cb12fe12-9a69-4b75-839f-46d96b52a62f" alt="Tela da loja com vários produtos listados em cards" width="500px">
</td>
</tr>
</table>


## 🚀 Funcionalidades Principais

O projeto simula as funcionalidades básicas de uma loja virtual, permitindo ao usuário:

* **Pesquisa de Produtos:** Buscar itens específicos utilizando a barra de pesquisa.
* **Filtro por Categoria:** Navegar pelas categorias disponíveis em uma barra lateral para filtrar os produtos exibidos.
* **Detalhes do produto:** Mostra mais detalhes do produto e suas avaliações.
* **Carrinho de Compras:** Adicionar e remover produtos do carrinho, que atualiza a contagem de itens em tempo real.
* **Visualização do Carrinho:** Acessar uma página dedicada para ver todos os itens selecionados.
* **Checkout Simplificado:** Uma tela final para simular a finalização da compra.
* **Responsividade:** A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com foco no ecossistema React para criar uma Single Page Application (SPA) interativa.

* **HTML5 & CSS3:** Para a estruturação e estilização do layout.
* **React:** Para a construção da interface de usuário de forma componentizada.
* **React Router:** Para possibilitar múltiplas rotas em cada funcionalidade da página.
* **JavaScript (ES6+):** Para a lógica da aplicação e manipulação de dados.
* **API Externa:** Os dados dos produtos (nomes, imagens e preços) são consumidos da API pública e gratuita [**DummyJSON**](https://dummyjson.com/).

## ⚙️ Como Executar o Projeto Localmente

Para rodar este projeto em sua máquina, você precisará ter o [Node.js](https://nodejs.org/) instalado. Siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Warywise/online-store.git

2. **Navegue até o diretório do projeto:**
   ```bash
   cd online-store
   
3. **Instale as dependências:**
   ```bash
   npm install
   
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start

A aplicação será aberta automaticamente no seu navegador em http://localhost:3000.
