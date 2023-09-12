//arquivo relativo a comunicação backend
require("dotenv").config();

const db = require("./db");

const port = process.env.PORT;

const express = require('express');

const app = express();

//configurando beck para receber json
app.use(express.json());

//criando uma rota para teste
app.get("/", (req, res) => {
    res.json(
        {
            message: "Funcionando"
        }
    )
})

//criando uma rota para lista apenas usuario
//os : informa que será passado um parametro genérico.
app.get("/users/:id", async (req, res) => {
                                //passando o id da url para a função pesquisar no banco.
    const user = await db.selectUser(req.params.id);
    res.json(user);
})
//criando uma rota para lista os usuarios, async por causa do banco
app.get("/users", async (req, res) => {
    const users = await db.selectUsers();
    res.json(users);
})

//rota para cadastro
app.post("/users", async (req, res) => {
    await db.insertUser(req.body);
    //para demostrar que os dados foi cadastrado com sucesso usa-se o 201
    res.sendStatus(201);
})

app.listen(port);

console.log("back rodando")