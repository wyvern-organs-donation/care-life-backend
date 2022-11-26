## Care Life - Configurando e Inicializando o Projeto Frontend

### Problemática do projeto 💬

> A doação de órgãos ou de tecidos é o ato pelo qual manifestamos a vontade de doar uma ou
mais partes do nosso corpo para ajudar no tratamento de outras pessoas.
De acordo com o Ministério da Saúde, a doação pode ser de órgãos **(rim, fígado, coração,
pâncreas e pulmão) ou de tecidos (córnea, pele, ossos, válvulas cardíacas, cartilagem, medula
óssea e sangue de cordão umbilical)**. A doação de órgãos como rim, parte do fígado ou da
medula óssea pode ser feita em vida.

 O Care Life é uma aplicação Web planejada e desenvolvida pela Wyverns Squad para o Bootcamp do Instituto Atlântico, para solucionar a problemática citada.
 
### Equipe de desenvolvimento Wyverns Squad 👨‍💻
- Ana Carolina
- Carlos Cesar
- Gabriel da Silva Sá
- Gilmar Freire
- Gilvânia Moreira
- Gustavo Henrique
- Rafaella Sampaio
- Tiago Costa

### Tecnologia Utilizadas no Backend 📟
- Vite
- React
- Bootstrap

> Status: Finalizado ⚠️

### Passo a Passo para a instalação 📟


1. Primeiramente deverá fazer o clone da aplicação em sua máquina:

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
2. Para essa próxima etapa é necessário ter o arquivo [`.env` configurado](https://www.prisma.io/docs/concepts/database-connectors/mysql). ⚠️

```
    mysql://USER:PASSWORD@HOST:PORT/DATABASE
    SECRET="SECRET"
    EMAIL_USER="mailtrap_user"
    EMAIL_PASS="mailtrap_pass"
```
* Utilizamos o [mailtrap](https://mailtrap.io/) como servidor de envio de emails. 

3. Logo após a instalação, utilizamos o `npx prisma migrate dev` para criar as tabelas do nosso banco. 
```
    npx prisma migrate dev
```
Para essa próxima etapa é necessário ter o arquivo `.env` configurado (utilizar o .env.example como base).

4. Em seguida, utilizamos o `npx prisma generate` para inicilizar e gerar um cliente prisma. 
```
    npx prisma generate
```

5. Para popular o Banco de dados, utilizamos o `npx prisma db seed`. 
```
    npx prisma db seed
```

O usuario padrão gerado é:
```
nome: Admin
email: admin@carelife.com
senha: admin
```

6. Para gerar a documentação do Swagger, utilizamos o `npm run swagger-autogen`. 
```
    npm run swagger-autogen
```

7. E, por fim, usamos o `npm start` para iniciar o servidor em modo de desenvolvimento  no endereço: [http://localhost:3000](http://localhost:3000)
```
    npm start
```

Para acessar a documentação do Swagger e testar a API basta acessar:
http://localhost:3000/doc
