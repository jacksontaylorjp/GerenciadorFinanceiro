//arquivo relativo a comunicação backend
require("dotenv").config();

const db = require("./db");

//escutando ambas as porta 4000 e 3000
const port = process.env.PORT || 3000;

const express = require('express');

//token jwt, é necessário o npm i jsonwebtoken
const jwt = require('jsonwebtoken');
const SECRET = 'admin';

//para resolver o problema na comunicação backend com o front
const cors = require('cors');
// Configuração do middleware CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Substitua pelo endereço do seu front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite enviar cookies e cabeçalhos de autenticação
};

const app = express();

app.use(cors(corsOptions));

//permite solicitações de todas as origem
//importante colocar restrições quando na produção.
app.use(cors({
    origin: '*'
}));

//configurando beck para receber json
app.use(express.json());
//-----------------------------------------------
// class AlunoController {
//     constructor(alunoService){
//         this.service = alunoService;
//     }
    
//     criar(req, res){
//         console.log(this.service);
//         this.service.criar();
//         res.json(
//             {
//                 message: "Criar aluno",
//             }
//         )
//     }
//     mostrar(req, res){
//         const {id} = req.params;

//         console.log(this.service);
//         const aluno = this.service.mostrar(id);

//         res.json(
//             {
//                 message: "Mostrar aluno #" + id,
//                 aluno
//             }
//         )
//     }

// }
// class AlunoService {
//     constructor(repository){
//         this.repository = repository;
//     }
//     criar(){
//         this.repository.criar();
//     }
//     mostrar(id){
//         return this.repository.mostrar(id); 
//     }
// }
// class AlunoRepository {
//     criar(){
//         console.log("Criar novo usuário");
//     }
//     mostrar(id){
//         return {
//             id: id,
//             name: "Mostrar"
//         }
//     }
// }

// const repository = new AlunoRepository();
// const alunoService = new AlunoService(repository);
// const alunoController = new AlunoController(alunoService);

// app.get('/alunos/:id', alunoController.mostrar);
// app.post('/alunos', alunoController.criar);
// // app.get('/api/, )
//-------------------------------------------

//criando uma rota para teste
app.get("/", (req, res) => {
    res.json(
        {
            message: "Funcionando",
        }
    )
})

//função para utilizar nas rotas seguras
function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];

    const index = backlist.findIndex(item => item === token);
    //!== -1, ou seja, encotrou o token na blacklist
    //como essa blacklist vai crescendo indefinidamente é necessário usar um método ou limpar a mesma.
    if (index !== -1) return res.status(401).end();

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).end();
        req.useId = decoded.useId;
        req.id = decoded.id;
        //o next informa que é para executar as proximas camadas/funções
        next();
    })
}

//criando uma rota para lista os usuarios, async por causa do banco
//colocando a verifyJWT para deixar a rota segura
//IMPORTANT: É NECESSÁRIO PARA O TOKEN PELO HEADERS PARA TER ACESSO A ROTA
//...USANDO O X-ACCESS-TOKEN E NO VALUE O TOKEN
app.get("/users", verifyJWT, async (req, res) => {
    console.log('usuário ' + req.useId + ' está logado');
    const users = await db.selectUsers();
    res.json(users);
})


//criando uma rota para login
app.post('/login', async (req, res) => {
    const AllUsers = await db.selectUsers();
    try {
        AllUsers.forEach(user => {
            if (req.body.user === user._email && req.body.password === user._password) {
                //os dados de user e password conferem então
                //o primeiro parametro identifica minimamente o usuario
                //o segundo parametro é a senha da assinatura
                //o terceira parametro são as opções, que nesse caso foi colocado um tempo de expiração para o toke
                const token = jwt.sign({ useId: user._name, id: user.id }, SECRET, { expiresIn: 1000000 });
                //o front precisa guardar para as requisições
                return res.json({ auth: true, token, user_id: user.id, user_name: user._name });
            }
        });
        return res.json({ error: "E-mail ou senha inválido!" });
    } catch (e) {
        console.log(e.message)
    }
    // res.status(401).end();
})

//rota logout
//no lado do front o token que poderá esta armazenado em um cookie ou localstore podera ser
//..apagado e no back esse token poderá ser colocado em uma blacklist
//a backlist usada é apenas um exemplo simples
const backlist = [];
app.post('/logout', (req, res) => {
    backlist.push(req.headers['x-access-token']);
    res.end();
})


// rota para cadastro de receita
app.post("/insert_receita", verifyJWT, async (req, res) => {
    await db.insertReceita(req.body.receita, req.id);
    //para demostrar que os dados foi cadastrado com sucesso usa-se o 201
    res.sendStatus(201);
})

// rota para cadastro de despesa
app.post("/insert_despesa", verifyJWT, async (req, res) => {
    await db.insertDespesa(req.body.despesa, req.id);
    //para demostrar que os dados foi cadastrado com sucesso usa-se o 201
    res.sendStatus(201);
})

//rota para buscar os valores totais por mês de um ano específico
app.get("/select_receita_month/:year", verifyJWT, async (req, res) => {
    const receita = await db.selectReceitaOUDespesaYear(req.id, req.params.year, 'datarecebimento', 'receita');
    res.json(receita);
});

app.get("/select_despesa_month/:year", verifyJWT, async (req, res) => {
    const despesa = await db.selectReceitaOUDespesaYear(req.id, req.params.year, 'datavencimento', 'despesa');
    res.json(despesa);
});

app.get("/select_receita", verifyJWT, async (req, res) => {
    const receita = await db.select_receitaOUdespesa('receita');
    res.json(receita);
});

app.get("/select_despesa", verifyJWT, async (req, res) => {
    const despesa = await db.select_receitaOUdespesa('despesa');
    res.json(despesa);
});

//criando uma rota para lista apenas usuario
//os : informa que será passado um parametro genérico.
// app.get("/users/:id", async (req, res) => {
//     //passando o id da url para a função pesquisar no banco.
//     const user = await db.selectUser(req.params.id);
//     res.json(user);
// })


//rota para cadastro
// app.post("/users", async (req, res) => {
//     await db.insertUser(req.body);
//     //para demostrar que os dados foi cadastrado com sucesso usa-se o 201
//     res.sendStatus(201);
// })

//rota para atualização
// app.patch("/users/:id", async (req, res) => {
//     //pegando o id com o params e os dados do cliente no body
//     await db.updateUser(req.params.id, req.body);
//     //para demostrar que os dados foi atualizado 200
//     res.sendStatus(200);
// })

//rota para excluir
// app.delete("/users/:id", async (req, res) => {
//     //pegando o id com o params e os dados do cliente no body
//     await db.deleteUser(req.params.id);
//     //para demostrar que os dados foi 204
//     res.sendStatus(204);
// })

//o server esta escutando na porta informada no .env
app.listen(port);

console.log("back rodando")