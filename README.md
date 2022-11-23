## Configurando e inicializando o projeto

## Wyverns Squad
- Ana Carolina
- Carlos Cesar
- Gabriel da Silva Sá
- Gilmar Freire
- Gilvânia Moreira
- Gustavo Henrique
- Rafaella Sampaio
- Tiago Costa

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
Para essa próxima etapa é necessário ter o arquivo [`.env` configurado](https://www.prisma.io/docs/concepts/database-connectors/mysql).

```
    mysql://USER:PASSWORD@HOST:PORT/DATABASE
    SECRET="SECRET"
    EMAIL_USER="mailtrap_user"
    EMAIL_PASS="mailtrap_pass"
```
* Utilizamos o [mailtrap](https://mailtrap.io/) como servidor de envio de emails.

Logo após a instalação, utilizamos o `npx prisma migrate dev` para criar as tabelas do nosso banco. 
```
    npx prisma migrate dev
```
Para essa próxima etapa é necessário ter o arquivo `.env` configurado (utilizar o .env.example como base).

Em seguida, utilizamos o `npx prisma generate` para inicilizar e gerar um cliente prisma. 
```
    npx prisma generate
```

Para popular o Banco de dados, utilizamos o `npx prisma db seed`. 
```
    npx prisma db seed
```

O usuario padrão gerado é:
```
nome: Admin
email: admin@carelife.com
senha: admin
```

Para gerar a documentação do Swagger, utilizamos o `npm run swagger-autogen`. 
```
    npm run swagger-autogen
```

E, por fim, usamos o `npm start` para iniciar o servidor em modo de desenvolvimento  no endereço: [http://localhost:3000](http://localhost:3000)
```
    npm start
```

Para acessar a documentação do Swagger e testar a API basta acessar:
http://localhost:3000/doc
