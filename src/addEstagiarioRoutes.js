const Express = require("express");
const Router = Express.Router();

const Mongoose = require("mongoose");
require("../src/models/Estagiario")
const Estagiario = Mongoose.model("estagiarios");

var estagiarioDigitado = {};


Router.get('/cadastro', (req, res) => {
    res.render('cadastroEstagiario', estagiarioDigitado);
    //res.send("Página de cadastro de estagiário");
});

Router.get('/listar', (req, res) => {
    Estagiario.find().sort({registerDate: "desc"}).then((estagiarios) => {
        res.render('listarEstagiarios', {estagiarios: estagiarios.map(estagiarios => estagiarios.toJSON())});
    });
    //res.send("Página de cadastro de estagiário");
});

Router.post('/cadastro/novo', (req, res) => {

    estagiarioDigitado = {
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
    
    if(!validarEstagiario(estagiarioDigitado)){
        res.redirect("/estagiarios/cadastro");
        return;
    }
    
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
        estagiarioDigitado = {};
    }catch(err){
        console.log("falhou a criação da categoria: " + err);
    }
});

function validarEstagiario(estagiario){
    return
    validarNome(estagiario.nome) ||
    validarDataNascimento(estagiario.dataNascimento) ||
    validarRegistroAcademico ||
    validarCurso ||
    validarTurno || 
    validarCedulaDeIdentidade || 
    validarCpf || 
    validarNacionalidade ||
    validarEstadoCivil || 
    validarCidade || 
    validarEstado ||
    validarCep ||
    validarFone ||
    validarEmail;
}

function validarNome(nome){
    return !(!nome || typeof nome == undefined || nome == null);
};

function validarDataNascimento(dataNascimento){
    return !(!dataNascimento || typeof dataNascimento == undefined || dataNascimento == null);
};

function validarRegistroAcademico(registroAcademico){
    return !(!registroAcademico || typeof registroAcademico == undefined || registroAcademico == null);
};

function validarCurso(curso){
    return !(!curso || typeof curso == undefined || curso == null);
};

function validarTurno(turno){
    return !(!turno || typeof turno == undefined || turno == null);
};

function validarCedulaDeIdentidade(cedulaDeIdentidade){
    return !(!cedulaDeIdentidade || typeof cedulaDeIdentidade == undefined || cedulaDeIdentidade == null);
};

function validarCpf(cpf){
    return !(!cpf || typeof cpf == undefined || cpf == null);
};

function validarNacionalidade(nacionalidade){
    return !(!nacionalidade || typeof nacionalidade == undefined || nacionalidade == null);
};

function validarEstadoCivil(estadoCivil){
    return !(!estadoCivil || typeof estadoCivil == undefined || estadoCivil == null);
};

function validarCidade(cidade){
    return !(!cidade || typeof cidade == undefined || cidade == null);
};

function validarEstado(estado){
    return !(!estado || typeof estado == undefined || estado == null);
};

function validarCep(cep){
    return !(!cep || typeof cep == undefined || cep == null);
};

function validarFone(fone){
    return !(!fone || typeof fone == undefined || fone == null);
};

function validarEmail(email){
    return !(!email || typeof email == undefined || email == null);
};

module.exports = Router;