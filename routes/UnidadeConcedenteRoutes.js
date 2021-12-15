// Carregamento de módulos
const Express = require("express");
const Router = Express.Router();
const Mongoose = require("mongoose");

// Carregamento dos modelos do banco de dados
require("../models/UnidadeConcedente")
const UnidadeConcedente = Mongoose.model("unidadesConcedentes");

//Rotas

//Rota que renderiza a página do formulário de cadastro.
Router.get('/cadastro', (req, res) => {
    res.render('unidadeConcedente/cadastroUnidadeConcedente');
});

//Rota que renderiza a página da lista de todos as unidades concedente do banco de dados.
Router.get('/listar', (req, res) => {
    UnidadeConcedente.find().sort({registerDate: "desc"}).then((unidadeConcedente) => {
        res.render('unidadeConcedente/listarUnidadeConcedente', {unidadeConcedente: unidadeConcedente.map(unidadeConcedente => unidadeConcedente.toJSON())});
    });
});

/*
Rota que cria uma nova unidade concedente no banco de dados 
a partir dos dados recebidos do formulário de cadastro.
*/
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