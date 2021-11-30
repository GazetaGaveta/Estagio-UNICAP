const Express = require("express");
const Router = Express.Router();

const Mongoose = require("mongoose");
require("../models/Estagio")
const Estagiario = Mongoose.model("estagios");

Router.get('/cadastro', (req, res) => {
    res.render('estagio/cadastroEstagio');
});

Router.get('/listar', (req, res) => {
    Estagiario.find().sort({registerDate: "desc"}).then((estagios) => {
        res.render('estagio/listarEstagios', {estagios: estagios.map(estagios => estagios.toJSON())});
    });
});

Router.post('/cadastro/novo', (req, res) => {

    const novoEstagio = {
        natureza: req.body.natureza,
        vigenciaInicial: req.body.vigenciaInicial,
        vigenciaFinal: req.body.vigenciaFinal,
        dias: req.body.dias,
        horario: req.body.horario,
        qtdhorasDiarias: req.body.qtdhorasDiarias,
        qtdHorasSemanais: req.body.qtdHorasSemanais,
        local: req.body.local,
        supervisor: req.body.supervisor,
        cargo: req.body.cargo,
        apoliceDeSeguro: req.body.apoliceDeSeguro,
        seguradora: req.body.seguradora,
        bolsaEstagio: req.body.bolsaEstagio,
        auxilioTransporte: req.body.auxilioTransporte,
        planoDeAtividades: req.body.planoDeAtividades
    };

    let save = new Estagio(novoEstagio);

    try{
        save.save();
        res.redirect("/estagios/listar");
    }catch(err){
        console.log("falhou a criação da categoria: " + err);
    }
});

module.exports = Router;