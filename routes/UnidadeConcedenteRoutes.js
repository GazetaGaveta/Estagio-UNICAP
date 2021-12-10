const Express = require("express");
const Router = Express.Router();

const Mongoose = require("mongoose");
require("../models/UnidadeConcedente")
const UnidadeConcedente = Mongoose.model("unidadesConcedentes");

Router.get('/cadastro', (req, res) => {
    res.render('unidadeConcedente/cadastroUnidadeConcedente');
});

Router.get('/listar', (req, res) => {
    UnidadeConcedente.find().sort({registerDate: "desc"}).then((unidadeConcedente) => {
        res.render('unidadeConcedente/listarUnidadeConcedente', {unidadeConcedente: unidadeConcedente.map(unidadeConcedente => unidadeConcedente.toJSON())});
    });
});

Router.post('/cadastro/novo', (req, res) => {

    const novaUnidadeConcedente = {
        razaoSocial: req.body.razaoSocial,
        cnpjOuMf: req.body.cnpjOuMf,
        endereço: req.body.endereço,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        cep: req.body.cep,
        fone: req.body.fone,
        email: req.body.email,
        representanteLegal: req.body.representanteLegal,
        cargo: req.body.cargo,
        profissionalRegistroOuLiberal: req.body.profissionalRegistroOuLiberal,
        orgao: req.body.orgao
    };

    let save = new UnidadeConcedente(novaUnidadeConcedente);

    try{
        save.save();
        res.redirect("/concedentes/listar");
    }catch(err){
        console.log("falhou a criação da unidade concedente: " + err);
    }
});

module.exports = Router;