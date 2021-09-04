<h1 align="center">D1 Smarkio</h1>
<p align="center">Teste Técnico</p>

## Descrição do projeto:
Projeto desenvolvido para o teste técnico da D1 Smarkio

Este projeto consome a API Text to Speech do IBM Watson para reproduzir o áudio do comentário cadastrado.
 
## Configurações do banco de dados no arquivo knexfile.js
 
```bash

# Instale packages necessários
$ npm i

# Instale o knex globalmente para utilizar o próximo comando
$ npm i knex -g

# Este comando criará as tabelas
$ knex migrate:latest

# Inicie o modo de desenvolvimento para rodar o servidor 
$ npm run dev

```
Vá até a pasta do projeto "layout" e acesse o arquivo "index.html".

No navegador, cadastre um comentário e clique no botão à direita para ouvi-lo.

## Tecnologias utilizadas neste projeto:

- [Node.js](https://nodejs.org/en/)
- [Express](https://www.npmjs.com/package/express)  
- [Watson](https://www.npmjs.com/package/ibm-watson)