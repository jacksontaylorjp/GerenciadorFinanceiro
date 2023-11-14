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

    return pool.connect();
}

connect();

async function disconnect(pool, message="CONNN"){
    await pool.end();
    console.log("Conexão encerrada!", message);
}

async function selectUsers() {
    //connectando ao banco
    const client = await connect();
    //comando para o banco
    const res = await client.query("SELECT * FROM users");
    // disconnect(client, "Select users");
    return res.rows;
}

//listando apenas 1 user
async function selectUser(id) {
    //connectando ao banco
    const client = await connect();
    //comando para o banco, foi passado de forma diferente para evitar ataques.
    const res = await client.query("SELECT * FROM users WHERE ID=$1", [id]);
    // disconnect(client, "Select user");
    return res.rows;
}
//inserindo user
async function insertUser(user) {
    //connectando ao banco
    const client = await connect();
    const sql = "INSERT INTO users(_name, _email, _password) VALUES ($1, $2, $3);";
    const values = [user._name, user._email, user._password];
    //comando para o banco, foi passado de forma diferente para evitar ataques.
    // disconnect(client, "insert user");
    return await client.query(sql, values);
}
//atualizando usuário
async function updateUser(id, user) {
    //connectando ao banco
    const client = await connect();
    const sql = "UPDATE users SET _name=$1, _password=$2 WHERE id=$3";
    const values = [user.name, user.password, id];
    // disconnect(client, "Select update user");
    //comando para o banco, foi passado de forma diferente para evitar ataques.
    return await client.query(sql, values);
}
//atualizando usuário
async function deleteUser(id) {
    //connectando ao banco
    const client = await connect();
    const sql = "DELETE FROM users WHERE id=$1";
    const values = [id];
    // disconnect(client, "delete users");
    //comando para o banco, foi passado de forma diferente para evitar ataques.
    return await client.query(sql, values);
}

async function select_receitaOUdespesa(receitaOUdespesa){
    const client = await connect();
    const res = await client.query(`SELECT * FROM ${receitaOUdespesa}`);
    // disconnect(client, "Select users");
    return res.rows;
}

async function insertReceita(receita, id) {
    const client = await connect();
    const sql = "INSERT INTO receita (tipo, datarecebimento, descricao, valor, user_id)values($1, $2, $3, $4, $5) ;"
    const values = [receita.tipo, receita.datarecebimento, receita.descricao, receita.valor, id];
    // disconnect(client, "inserir receita");
    return await client.query(sql, values);
}
async function insertDespesa(despesa, id) {
    const client = await connect();
    const sql = "INSERT INTO despesa (tipo, datavencimento, descricao, valor, user_id)values($1, $2, $3, $4, $5) ;"
    const values = [despesa.tipo, despesa.datavencimento, despesa.descricao, despesa.valor, id];
    // disconnect(client, "inserir despesa");
    return await client.query(sql, values);
}

//retorna os valores por mes de acordo com o ano informado
//retorna zero quando a soma naquele mês for zero
async function selectReceitaOUDespesaYear(id, year, data, receitaOUdespesa) {
    const client = await connect();
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
    // disconnect(client, "select receita ou despesa por ano");
    return res.rows;
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