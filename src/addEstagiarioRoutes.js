const { Console } = require("console");
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
    console.log(validarCpf(estagiario.cpf));

    return validarNome(estagiario.nome) &
    validarDataNascimento(estagiario.dataNascimento) &
    validarRegistroAcademico(estagiario.registroAcademico) &
    validarCurso(estagiario.curso) &
    validarTurno(estagiario.turno) &
    validarCedulaDeIdentidade(estagiario.cedulaDeIdentidade) &
    validarCpf(estagiario.cpf) &
    validarNacionalidade(estagiario.nacionalidade) &
    validarEstadoCivil(estagiario.estadoCivil) &
    validarCidade(estagiario.cidade) &
    validarEstado(estagiario.estado) &
    validarCep(estagiario.cep) &
    validarFone(estagiario.fone) &
    validarEmail(estagiario.email);
}

function isEmpyt(value){
    return (!value || typeof value == undefined || value == null);
}

function validarNome(nome){
    return !isEmpyt(nome);
};

function validarDataNascimento(dataNascimento){
    let dateFormat = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

    if(isEmpyt(dataNascimento) && dateFormat.test(dataNascimento)){
        return false;
    }

    let partes = dataNascimento.split('/');

    let day = parseInt(partes[0]);
    let month = parseInt(partes[1]);
    let year = parseInt(partes[2]);

    let date = new Date(`${month}/${day}/${year}`);

    if(date.valueOf().toString() === 'NaN'){
        return false;
    }

    return true;
};

function validarRegistroAcademico(registroAcademico){
    return !isEmpyt(registroAcademico);
};

function validarCurso(curso){
    return !isEmpyt(curso);
};

function validarTurno(turno){
    return !isEmpyt(turno);
};

function validarCedulaDeIdentidade(cedulaDeIdentidade){
    return !isEmpyt(cedulaDeIdentidade);
};

function validarCpf(cpf){

    if (isEmpyt(cpf)){
        return false;
    }

    let cpfArray = [];
    let i;

    Array.from(cpf).forEach(element => {
        i = parseInt(element);
        if(!(i >= 0 && i <= 9) || cpfArray.length > 11){
            return false;
        }
        cpfArray.push(i);
    });

    cpfString = cpfArray.toString().replace(/,/gi, "",);
    // Elimina CPFs invalidos conhecidos	
    if (cpfString == "00000000000" || 
        cpfString == "11111111111" || 
        cpfString == "22222222222" || 
        cpfString == "33333333333" || 
        cpfString == "44444444444" || 
        cpfString == "55555555555" || 
        cpfString == "66666666666" || 
        cpfString == "77777777777" || 
        cpfString == "88888888888" || 
        cpfString == "99999999999")
        {
            return false;
        }

    // Valida 1o digito	
    add = 0;	
    for (i=0; i < 9; i ++)		
        add += cpfArray[i] * (10 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)	{
            rev = 0;
        }	
        if (rev != cpfArray[9]){
            return false;	
        }

    // Valida 2o digito	
    add = 0;	
    for (i = 0; i < 10; i ++)		
        add += cpfArray[i] * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11){
        rev = 0;
    }	
    if (rev != cpfArray[10]){
        return false;
    }	
    return true;   
};

function validarNacionalidade(nacionalidade){
    return !isEmpyt(nacionalidade);
};

function validarEstadoCivil(estadoCivil){
    return !isEmpyt(estadoCivil);
};

function validarCidade(cidade){
    return !isEmpyt(cidade);
};

function validarEstado(estado){
    return !isEmpyt(estado);
};

function validarCep(cep){
    return !isEmpyt(cep);
};

function validarFone(fone){
    return !isEmpyt(fone);
};

function validarEmail(email){
    return !isEmpyt(email) && email.indexOf("@") != -1;
};

module.exports = Router;