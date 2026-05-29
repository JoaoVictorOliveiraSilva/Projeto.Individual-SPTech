-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/





CREATE DATABASE aquatech;
USE aquatech;




CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL
);


CREATE TABLE quiz_resultado (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    pontos_ps2 INT NOT NULL,
    pontos_ps3 INT NOT NULL,
    recomendado VARCHAR(10) NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fkQuizUsuario
        FOREIGN KEY (fk_usuario)
        REFERENCES usuario(id)
);


CREATE TABLE quiz_resposta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_quiz_resultado INT NOT NULL,
    numero_questao INT NOT NULL,
    pergunta VARCHAR(200) NOT NULL,
    resposta VARCHAR(200) NOT NULL,

    CONSTRAINT fkRespostaResultado
        FOREIGN KEY (fk_quiz_resultado)
        REFERENCES quiz_resultado(id)
);

SELECT
    u.id AS id_usuario,
    u.nome,
    u.email,

    qr.id AS id_resultado,
    qr.pontos_ps2,
    qr.pontos_ps3,
    qr.recomendado,
    qr.criado_em,

    qresp.id AS id_resposta,
    qresp.numero_questao,
    qresp.pergunta,
    qresp.resposta

FROM usuario u

INNER JOIN quiz_resultado qr
    ON qr.fk_usuario = u.id

INNER JOIN quiz_resposta qresp
    ON qresp.fk_quiz_resultado = qr.id

ORDER BY
    u.id ASC,
    qr.id DESC,
    qresp.numero_questao ASC;

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */


