const Express = require("express");
const Router = Express.Router();

const Mongoose = require("mongoose");
require("../models/UnidadeConcedente")
const Estagiario = Mongoose.model("unidadesConcedentes");

Router.get('/cadastro', (req, res) => {
    res.render('unidadeConcedente/cadastroUnidadeConcedente');
});

Router.get('/listar', (req, res) => {
    Estagiario.find().sort({registerDate: "desc"}).then((estagios) => {
        res.render('unidadeConcedente/listarUnidadeConcedente', {estagios: estagios.map(estagios => estagios.toJSON())});
    });
});

Router.post('/cadastro/novo', (req, res) => {

    const novoEstagio = {
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

    let save = new Estagio(novoEstagio);

    try{
        save.save();
        res.redirect("/estagios/listar");
    }catch(err){
        console.log("falhou a criação da categoria: " + err);
    }
});

module.exports = Router;