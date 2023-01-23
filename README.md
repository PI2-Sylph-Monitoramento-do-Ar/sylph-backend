# Sylph Bankend

![image](https://user-images.githubusercontent.com/37307099/209450444-ecbf09a2-f5c6-457b-b9c1-5ad55456277c.png)


## Configuração

### Pré requisitos 

Antes de executar o projeto, você deve ter instalado: 

- [Docker](https://www.docker.com/)

### Variáveis de ambiente

Na pasta raiz de seu projeto, crie um arquivo .env com o conteúdo a seguir: 

````
MONGO_URL=mongodb://mongo:27017/sylph
PORT=5050
````

## Execução

Para executar o projeto, entre na pasta raíz e execute: 

- Para a primeira vez rodando o projeto: 

````
make build
````

- Para demais vezes rodando o projeto: 

````
make up
````


## Seeds

Para executar o seeds do banco de dados basta rodar, com o programa em execução e em uma aba separada, o comando: 

````
make seed
````
