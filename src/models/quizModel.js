var database = require("../database/config");

function salvar(fkUsuario, pontosps2, pontosps3, recomendado) {

    var instrucaoSql = `
        INSERT INTO quiz_resultado
        (fk_usuario, pontos_ps2, pontos_ps3, recomendado)
        VALUES
        (${fkUsuario}, ${pontosps2}, ${pontosps3}, '${recomendado}');
    `;

    console.log("Executando SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function buscarUltimoResultado(fkUsuario) {

    var instrucaoSql = `
        SELECT id
        FROM quiz_resultado
        WHERE fk_usuario = ${fkUsuario}
        ORDER BY id DESC;
    `;

    console.log("Executando SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function salvarResposta(fkQuizResultado, numeroQuestao, pergunta, resposta) {

    var instrucaoSql = `
        INSERT INTO quiz_resposta
        (fk_quiz_resultado, numero_questao, pergunta, resposta)
        VALUES
        (${fkQuizResultado}, ${numeroQuestao}, '${pergunta}', '${resposta}');
    `;

    console.log("Executando SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function buscarPorUsuario(fkUsuario) {

    var instrucaoSql = `
        SELECT
            u.nome,
            u.email,
            qr.id AS id_resultado,
            qr.pontos_ps2,
            qr.pontos_ps3,
            qr.recomendado,
            qr.criado_em,
            qresp.numero_questao,
            qresp.pergunta,
            qresp.resposta
        FROM usuario u
        INNER JOIN quiz_resultado qr
            ON qr.fk_usuario = u.id
        INNER JOIN quiz_resposta qresp
            ON qresp.fk_quiz_resultado = qr.id
        WHERE u.id = ${fkUsuario}
        ORDER BY qr.id DESC, qresp.numero_questao ASC;
    `;

    console.log("Executando SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    salvar,
    buscarUltimoResultado,
    salvarResposta,
    buscarPorUsuario
};