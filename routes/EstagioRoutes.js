const Express = require("express");
const Router = Express.Router();

const Mongoose = require("mongoose");
require("../models/Estagio")
const Estagio = Mongoose.model("estagios");

const calculoEstagio = require('../calculosEstagio');

Router.get('/cadastro', (req, res) => {
    res.render('estagio/cadastroEstagio');
});

Router.get('/listar', (req, res) => {

/*
    let partes = Date.now();

    let day = parseInt(partes.getDate());
    let month = parseInt(partes.getMonth());
    let year = parseInt(partes.getFullYear());

    let final = new Date(`${month}/${day}/${year}`);*/

    Estagio.find().sort({registerDate: "desc"}).then((estagios) => {

        estagios = estagios.map(estagios => estagios.toJSON());


        let partes = estagios[0].vigenciaInicial.toString().split('/');

        let day = parseInt(partes[0]);
        let month = parseInt(partes[1]);
        let year = parseInt(partes[2]);

        let inicio = new Date(`${month}/${day}/${year}`);

        partes = estagios[0].vigenciaFinal.toString().split('/');

        day = parseInt(partes[0]);
        month = parseInt(partes[1]);
        year = parseInt(partes[2]);

        final = new Date(`${month}/${day}/${year}`);

        //console.log();
        estagios[0].diasTrabalhados = calculoEstagio.calcularDiasTrabalhados(inicio, final);

        //console.log(estagios[0].diasTrabalhados);
        /*
        let partes = estagios.vigenciaInicial.toString().split('/');

        let day = parseInt(partes[0]);
        let month = parseInt(partes[1]);
        let year = parseInt(partes[2]);

        let inicio = new Date(`${month}/${day}/${year}`);

        estagios.diasTrabalhados = calcularDiasTrabalhados(inicio, Date.now());
        */
        //res.render('estagio/listarEstagios', {estagios: estagios.map(estagios => estagios.toJSON())});
        res.render('estagio/listarEstagios', {estagios})
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
        console.log("falhou a criação do estágio: " + err);
    }
});

module.exports = Router;