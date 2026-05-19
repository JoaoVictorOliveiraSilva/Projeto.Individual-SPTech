var quizModel = require("../models/quizModel");

function salvar(req, res) {

    var fkUsuario = req.body.fkUsuario;
    var pontosps2 = req.body.pontosps2;
    var pontosps3 = req.body.pontosps3;
    var recomendado = req.body.recomendado;
    var respostas = req.body.respostas;

    console.log(req.body);

    if (fkUsuario == undefined) {
        return res.status(400).send("fkUsuario undefined");
    }

    if (pontosps2 == undefined) {
        return res.status(400).send("pontosps2 undefined");
    }

    if (pontosps3 == undefined) {
        return res.status(400).send("pontosps3 undefined");
    }

    if (recomendado == undefined) {
        return res.status(400).send("recomendado undefined");
    }

    quizModel.salvar(fkUsuario, pontosps2, pontosps3, recomendado)

        .then(function () {

            return quizModel.buscarUltimoResultado(fkUsuario);
        })

        .then(function (resultado) {

            var idResultado = resultado[0].id;

            var promessas = [];

            for (var i = 0; i < respostas.length; i++) {

                promessas.push(
                    quizModel.salvarResposta(
                        idResultado,
                        i + 1,
                        respostas[i].pergunta,
                        respostas[i].resposta
                    )
                );
            }

            return Promise.all(promessas);
        })

        .then(function () {

            res.status(200).json({
                mensagem: "Resultado salvo com sucesso"
            });
        })

        .catch(function (erro) {

            console.log(erro);

            res.status(500).json(erro);
        });
}

function buscar(req, res) {

    var fkUsuario = req.params.fkUsuario;

    if (fkUsuario == undefined) {
        return res.status(400).send("fkUsuario undefined");
    }

    quizModel.buscarPorUsuario(fkUsuario)

        .then(function (linhas) {

            if (linhas.length == 0) {
                return res.status(404).send("Nenhum resultado encontrado");
            }

            var dados = {
                nome: linhas[0].nome,
                email: linhas[0].email,
                pontos_ps2: linhas[0].pontos_ps2,
                pontos_ps3: linhas[0].pontos_ps3,
                recomendado: linhas[0].recomendado,
                criado_em: linhas[0].criado_em,

                respostas: linhas.map(function (l) {
                    return {
                        numero_questao: l.numero_questao,
                        pergunta: l.pergunta,
                        resposta: l.resposta
                    };
                })
            };

            res.json(dados);
        })

        .catch(function (erro) {

            console.log(erro);

            res.status(500).json(erro);
        });
}

module.exports = {
    salvar,
    buscar
};