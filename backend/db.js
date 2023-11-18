//arquivo relativo a banco de dados

async function connect() {
    // //se já estiver conexão ele retorna a conexão ativa
    // if(global.connection){
    //     return global.connection.connect;
    // }

    //utilizando método de conexão pool que faz o gerenciamento
    const { Pool } = require("pg");
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    })

    const client = await pool.connect();
    //retornando a hora do banco de dados para saber se a conexão esta ok
    const res = await client.query("select now()");
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;

    // return pool.connect();
    //retornando o client no lugar da pool
    //Neste exemplo, a função connect() agora retorna o cliente em vez do pool. Ao chamar connect(), você recebe um cliente que pode ser usado para realizar consultas. Após cada chamada da função, a função disconnect() é chamada para liberar o cliente de volta ao pool.
    // É importante notar que, ao usar client.release(), você não está realmente fechando a conexão física, mas sim liberando o cliente de volta ao pool para ser reutilizado. Se você ainda desejar fechar completamente a conexão física após cada chamada, você pode usar client.end() em vez de client.release().
    return client;
}

// connect();

async function disconnect(client, message = "CONNN") {
    await client.end();
    // await client.release();
    console.log("Conexão encerrada!", message);
}

async function selectUsers() {
    //connectando ao banco
    const client = await connect();
    try {
        const res = await client.query("SELECT * FROM users");
        return res.rows;
    } finally {
        disconnect(client, "Select users");
    }
}

//listando apenas 1 user
async function selectUser(id) {
    //connectando ao banco
    const client = await connect();
    try {
        //comando para o banco, foi passado de forma diferente para evitar ataques.
        const res = await client.query("SELECT * FROM users WHERE ID=$1", [id]);
        return res.rows;
    } finally {
        disconnect(client, "Select user");
    }
}
//inserindo user
async function insertUser(user) {
    //connectando ao banco
    const client = await connect();
    try {
        const sql = "INSERT INTO users(_name, _email, _password) VALUES ($1, $2, $3);";
        const values = [user._name, user._email, user._password];
        const res = await client.query(sql, values);
        return res;
    } finally {
        //comando para o banco, foi passado de forma diferente para evitar ataques.
        disconnect(client, "insert user");
    }
}
//atualizando usuário
async function updateUser(id, user) {
    //connectando ao banco
    const client = await connect();
    try {
        const sql = "UPDATE users SET _name=$1, _password=$2 WHERE id=$3";
        const values = [user.name, user.password, id];
        const res = await client.query(sql, values);
        return res;
    } finally {
        disconnect(client, "Select update user");
    }
}
//atualizando usuário
async function deleteUser(id) {
    //connectando ao banco
    const client = await connect();
    try {
        const sql = "DELETE FROM users WHERE id=$1";
        const values = [id];
        //comando para o banco, foi passado de forma diferente para evitar ataques.
        const res = await client.query(sql, values);
        return res;
    } finally {
        disconnect(client, "delete users");
    }
}

async function select_receitaOUdespesa(receitaOUdespesa) {
    const client = await connect();
    try {
        const res = await client.query(`SELECT * FROM ${receitaOUdespesa}`);
        return res.rows;
    } finally {
        disconnect(client, "Select users");
    }
}

async function insertReceita(receita, id) {
    const client = await connect();
    try {
        const sql = "INSERT INTO receita (tipo, datarecebimento, descricao, valor, user_id)values($1, $2, $3, $4, $5) ;"
        const values = [receita.tipo, receita.datarecebimento, receita.descricao, receita.valor, id];
        const res = await client.query(sql, values);
        return res;
    } finally {
        disconnect(client, "inserir receita");
    }
}
async function insertDespesa(despesa, id) {
    const client = await connect();
    try {
        const sql = "INSERT INTO despesa (tipo, datavencimento, descricao, valor, user_id)values($1, $2, $3, $4, $5) ;"
        const values = [despesa.tipo, despesa.datavencimento, despesa.descricao, despesa.valor, id];
        const res = await client.query(sql, values);
        return res;
    } finally {
        disconnect(client, "inserir despesa");
    }
}

//retorna os valores por mes de acordo com o ano informado
//retorna zero quando a soma naquele mês for zero
async function selectReceitaOUDespesaYear(id, year, data, receitaOUdespesa) {
    const client = await connect();
    try {
        const sql = `
        WITH meses AS (
            SELECT generate_series(1, 12) as mes -- Cria uma lista de todos os meses (de 1 a 12)
        )
        SELECT m.mes as mes, COALESCE(r.valor_total_mensal, 0) as valor_total_mensal
            FROM meses m
            LEFT JOIN (
                SELECT  
                    EXTRACT(MONTH FROM ${data}) as mes,
                    SUM(valor) as valor_total_mensal 
                FROM ${receitaOUdespesa} 
                WHERE EXTRACT(YEAR FROM ${data}) = ${year} 
                AND user_id = ${id} 
                GROUP BY EXTRACT(MONTH FROM ${data})
            ) 
            r ON m.mes = r.mes
            ORDER BY m.mes;
        `;
        const res = await client.query(sql);
        return res.rows;
    } finally {
        disconnect(client, "select receita ou despesa por ano");
    }
}

module.exports = {
    selectUsers,
    selectUser,
    insertUser,
    updateUser,
    deleteUser,
    select_receitaOUdespesa,
    insertReceita,
    insertDespesa,
    selectReceitaOUDespesaYear,

}