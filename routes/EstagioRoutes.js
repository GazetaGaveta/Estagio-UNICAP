const Express = require("express");
const Router = Express.Router();

const Mongoose = require("mongoose");
require("../models/Estagio")
require("../models/Estagiario")
require("../models/UnidadeConcedente")
const Estagio = Mongoose.model("estagios");
const Estagiario = Mongoose.model("estagiarios");
const UnidadeConcedente = Mongoose.model("unidadesConcedentes");


const CalculosEstagio = require("../calculosEstagio");

Router.get('/cadastro', async (req, res) => {

    let estagiarios = await Estagiario.find();
    estagiarios = estagiarios.map(estagiarios => estagiarios.toObject());

    let unidadesConcedentes = await UnidadeConcedente.find();
    unidadesConcedentes = unidadesConcedentes.map(unidadesConcedentes => unidadesConcedentes.toObject());

    //console.log(estagiarios);

    res.render('estagio/cadastroEstagio', {estagiarios: estagiarios, unidadesConcedentes: unidadesConcedentes});
});

Router.get('/listar', async (req, res) => {
    let estagios = await Estagio.find().sort({registerDate: "desc"});//.then((estagios) => {
        //res.render('estagio/listarEstagios', {estagios: estagios.map(estagios => estagios.toJSON())});
    //});
    //esta[0]["diasTrabalhados"] = CalculosEstagio.calcularDiasTrabalhados(esta[0].vigenciaInicial, esta[0].vigenciaFinal);
    aux = estagios.map(estagios => estagios.toObject());

    for(i = 0; i < aux.length; i++){

        dataInicial = new Date(aux[i].vigenciaInicial);
        aux[i].diasTrabalhados = CalculosEstagio.calcularDiasTrabalhados(dataInicial);

    }
    //aux["diasTrabalhados"] = CalculosEstagio.calcularDiasTrabalhados(esta[0].vigenciaInicial, esta[0].vigenciaFinal);
    //esta[0] = aux;
    //console.log(aux);
    res.render('estagio/listarEstagios', {estagios: aux});
});

Router.post('/cadastro/novo', async (req, res) => {

    let estag = await Estagiario.findById(req.body._idEstagiario);
    let uniConce = await UnidadeConcedente.findById(req.body._idConcedente);
    //estagiario = estagiario.map(estagiario => estagiario.toObject());

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
        planoDeAtividades: req.body.planoDeAtividades,
        estagiario: estag,
        unidadeConcedente: uniConce
    };

    let save = new Estagio(novoEstagio);

    try{
        await save.save();
        res.redirect("/estagios/listar");
    }catch(err){
        console.log("falhou a criação do estágio: " + err);
    }

    /*
    console.log();
    aux = await Estagio.findById(save._id);
    /*
    Estagio.updateOne(
        {_id: save._id}, 
        { $set: {'estagiario': 'estag'}},
        {upsert:true}
    );
    */


});

module.exports = Router;