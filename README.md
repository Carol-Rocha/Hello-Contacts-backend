# Hello Contacts Backend

Este é o repositório do backend da aplicação "Hello Contacts", uma API desenvolvida com Node.js, TypeScript e TypeORM. Esta API permite que os usuários realizem operações básicas em uma lista de contatos telefônicos, incluindo registro, login, visualização, criação, edição e exclusão de contatos.

## Funcionalidades

- **Registro e Login de Usuário**: Os usuários podem se registrar na aplicação e fazer login para acessar suas listas de contatos.
- **Gerenciamento de Contatos**: Os usuários podem visualizar todos os seus contatos, adicionar novos contatos, editar informações existentes e excluir contatos.
- **Manipulação de Dados Pessoais**: Os usuários podem atualizar suas informações pessoais, como nome, e-mail e senha.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **TypeORM**: ORM (Object-Relational Mapping) para TypeScript e JavaScript.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado o seguinte:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [TypeScript](https://www.typescriptlang.org/) (opcional)
- Banco de dados local (por exemplo, [PostgreSQL](https://www.postgresql.org/))

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/carol-rocha/Hello-Contacts-backend.git
    ```

2. Instale as dependências:

    ```bash
    cd Hello-Contacts-backend
    npm install
    ```

3. Configure o banco de dados local. Por exemplo, se estiver utilizando PostgreSQL, crie um banco de dados chamado `hello_contacts`.

4. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    ```
    DATABASE_URL="postgres://<USER>:<PASS>@<HOST>:<PORT>/<DATABASE>"
    SECRET_KEY=secret_key
    ```

    Substitua `seu-host`, `sua-porta`, `seu-username` e `sua-senha` pelos detalhes de conexão do seu banco de dados.

5. Execute as migrações do banco de dados:

    ```bash
    npm run typeorm migration:run
    ```

6. Execute a aplicação:

    ```bash
    npm start
    ```

    A API estará disponível em `http://localhost:3000` por padrão.


