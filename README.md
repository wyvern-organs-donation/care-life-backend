## Configurando e inicializando o projeto

Primeiramente deverá fazer o clone da aplicação em sua máquina:

Através do https
```
    git clone https://github.com/wyvern-organs-donation/care-life-backend.git
```

Através do ssh
```
    git clone git@github.com:wyvern-organs-donation/care-life-backend.git
```

Utilizamos o `npm install` para instalar todas as depedências utilizadas no projeto.

```
    npm install 
```
Para essa próxima etapa é necessário ter o arquivo `.env` configurado (utilizar o .env.example como base).

Logo após a instalação, utilizamos o `npx prisma generate` para inicilizar e gerar um cliente prisma. 
```
    npx prisma generate
```

E, por fim, usamos o `npm start` para iniciar o servidor em modo de desenvolvimento  no endereço: [http://localhost:3000](http://localhost:3000)
```
    npm start
```
