//arquivo relativo a comunicação backend
require("dotenv").config();

const db = require("./db");

const port = process.env.PORT;

const express = require('express');

//para resolver o problema na comunicação backend com o front
const cors = require('cors');

const app = express();

//permite solicitações de todas as origem
//importante colocar restrições quando na produção.
app.use(cors());

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

//rota para atualização
app.patch("/users/:id", async (req, res) => {
    //pegando o id com o params e os dados do cliente no body
    await db.updateUser(req.params.id, req.body);
    //para demostrar que os dados foi atualizado 200
    res.sendStatus(200);
})

//rota para excluir
app.delete("/users/:id", async (req, res) => {
    //pegando o id com o params e os dados do cliente no body
    await db.deleteUser(req.params.id);
    //para demostrar que os dados foi 204
    res.sendStatus(204);
})

//o server esta escutando na porta informada no .env
app.listen(port);

console.log("back rodando")