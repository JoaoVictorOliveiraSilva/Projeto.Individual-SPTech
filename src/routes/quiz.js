var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

// POST /quiz/salvar — salva o resultado ao terminar o quiz
router.post("/salvar", function (req, res) {
    quizController.salvar(req, res);
});

// GET /quiz/resultado/:fkUsuario — dashboard puxa o resultado do usuário
router.get("/resultado/:fkUsuario", function (req, res) {
    quizController.buscar(req, res);
});

module.exports = router;