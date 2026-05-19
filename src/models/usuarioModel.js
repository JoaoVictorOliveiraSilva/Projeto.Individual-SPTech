var database = require("../database/config");

// LOGIN
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email 
        FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

// CADASTRO (SEM fk_empresa)
function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES ('${nome}', '${email}', '${senha}');
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};