# Food Explorer

## 💻 Sobre

O Food Explorer é uma aplicação web de um restaurante. Após se cadastrar na plataforma o usuário estará apto a criar os pedidos. É possível adicionar pratos aos favoritos, buscar por pratos existentes, tanto por seus ingredientes,
criar pedidos, criar/editar/atualizar/deletar usuários e pratos, também é possível criar novos usuários.

Este repositório contém os dados do Backend da minha aplicação em Node.js

## 🚀 Deploy: (https://food-explorer-api-pj0v.onrender.com)


## 🛠 Tecnologias
As seguintes tecnologias foram empregadas na criação deste projeto:

* NodeJs
* Javascript
* Express
* Cors
* JSON Web Token
* Multer
* crypto
* dotenv
* express-async-errors
* knex
* swagger-jsdoc
* sqlite3
* swagger-ui-express

## 🚀 Como utilizar
Clone o projeto para o local desejado em seu computador.
```
$ git clone https://github.com/arielcBR/food-explorer-backend.git
```

### Navegue até o diretório do FrontEnd
```
$ cd food-explorer-backend
```

###  Instale as dependências necessárias
```
$ npm install
```

### Crie o banco de dados e tabelas necessárias para a aplicação
```
$ npm run migrations
```

### Execite para popular o banco de dados
```
$ npm run seeds
```

### Agora inicie o servidor do Backend
```
$ npm run dev
```

### Caso seja necessário é possível executar os testes unitários
```
$ npm run test
```

### O terminal irá exibir o endereço local onde a aplicação está sendo executada e a porta onde estará disponível a documentação com os endpoints e suas respectivas entradas e saídas
http://localhost:4000/api-docs

![Documentação Swagger](https://i.postimg.cc/VkZZRbK6/Captura-de-tela-de-2024-07-15-22-52-20.png)


### A API REST foi hospedado diretamente no Render.
  Por estar hospedado em um serviço gratuito, o BackEnd "hiberna" após 15 minutos sem utilização. 
Se você está tentando acessar o site e o BackEnd não responde, apenas aguarde, pois ele estará "inicializando" os serviços. Esta etapa poderá demorar até 1 minuto, dependendo da carga nos servidores do Render.




