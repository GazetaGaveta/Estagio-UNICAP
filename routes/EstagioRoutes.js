const Express = require("express");
const Router = Express.Router();

const Mongoose = require("mongoose");
require("../models/Estagio")
const Estagio = Mongoose.model("estagios");

const CalculosEstagio = require("../calculosEstagio");

Router.get('/cadastro', (req, res) => {
    res.render('estagio/cadastroEstagio');
});

Router.get('/listar', async (req, res) => {
    let esta = await Estagio.find().sort({registerDate: "desc"});//.then((estagios) => {
        //res.render('estagio/listarEstagios', {estagios: estagios.map(estagios => estagios.toJSON())});
    //});
    //esta[0]["diasTrabalhados"] = CalculosEstagio.calcularDiasTrabalhados(esta[0].vigenciaInicial, esta[0].vigenciaFinal);
    aux = esta.map(esta => esta.toObject());

    dataInicial = new Date(aux[0].vigenciaInicial);
    dataFinal = Date.now();

    
    console.log(dataFinal);

    aux[0].diasTrabalhados = CalculosEstagio.calcularDiasTrabalhados(dataInicial, dataFinal);
    //aux["diasTrabalhados"] = CalculosEstagio.calcularDiasTrabalhados(esta[0].vigenciaInicial, esta[0].vigenciaFinal);
    //esta[0] = aux;
    console.log(aux);
    res.render('estagio/listarEstagios', {estagios: aux});
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
        console.log("falhou a criação do estágio: " + err);
    }
});

module.exports = Router;