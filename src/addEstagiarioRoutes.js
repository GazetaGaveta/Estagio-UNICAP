const Express = require("express");
const Router = Express.Router();

const Mongoose = require("mongoose");
require("../src/models/Estagiario")
const Estagiario = Mongoose.model("estagiarios");

Router.get('/cadastro', (req, res) => {
    res.render('cadastroEstagiario');
    //res.send("Página de cadastro de estagiário");
});

Router.get('/listar', (req, res) => {
    Estagiario.find().sort({registerDate: "desc"}).then((estagiarios) => {
        res.render('listarEstagiarios', {estagiarios: estagiarios.map(estagiarios => estagiarios.toJSON())});
    });
    //res.send("Página de cadastro de estagiário");
});

Router.post('/cadastro/novo', (req, res) => {
    const novoEstagiario = {
        nome: req.body.nome,
        dataNascimento: req.body.dataNascimento,
        registroAcademico: req.body.registroAcademico,
        curso: req.body.curso,
        turno: req.body.turno,
        cedulaDeIdentidade: req.body.cedulaDeIdentidade,
        cpf: req.body.cpf,
        nacionalidade: req.body.nacionalidade,
        estadoCivil: req.body.estadoCivil,
        cidade: req.body.cidade,
        estado: req.body.estado,
        cep: req.body.cep,
        fone: req.body.fone,
        email: req.body.email,
    };

    let save = new Estagiario(novoEstagiario);
    try{
        save.save();
        res.redirect("/estagiarios/listar");
    }catch(err){
        console.log("falhou a criação da categoria: " + err);
    }
});

module.exports = Router;