// Carregamento de módulos
const Express = require("express");
const Router = Express.Router();
const Mongoose = require("mongoose");
const estagiarioValidation = require('../estagiarioValidation');

// Carregamento dos modelos do banco de dados
require("../models/Estagiario")
const Estagiario = Mongoose.model("estagiarios");

// Rotas
var estagiarioDigitado = {};

//Rota que renderiza a página do formulário de cadastro.
Router.get('/cadastro', (req, res) => {
    res.render('estagiario/cadastroEstagiario', estagiarioDigitado);
    //res.send("Página de cadastro de estagiário");
});

//Rota que renderiza a página da lista de todos os estagiários do banco de dados.
Router.get('/listar', (req, res) => {
    Estagiario.find().sort({registerDate: "desc"}).then((estagiarios) => {
        res.render('estagiario/listarEstagiarios', {estagiarios: estagiarios.map(estagiarios => estagiarios.toJSON())});
    });
    //res.send("Página de cadastro de estagiário");
});

//Rota que cria um novo estagiário no banco de dados a partir dos dados recebidos do formulário de cadastro.
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
        console.log("falhou a criação do estagiário: " + err);
    }
});

//Validação das informações do formulario do estagiário.
function validarEstagiario(estagiario){

    return estagiarioValidation.validarNome(estagiario.nome) &
    estagiarioValidation.validarDataNascimento(estagiario.dataNascimento) &
    estagiarioValidation.validarRegistroAcademico(estagiario.registroAcademico) &
    estagiarioValidation.validarCurso(estagiario.curso) &
    estagiarioValidation.validarTurno(estagiario.turno) &
    estagiarioValidation.validarCedulaDeIdentidade(estagiario.cedulaDeIdentidade) &
    estagiarioValidation.validarCpf(estagiario.cpf) &
    estagiarioValidation.validarNacionalidade(estagiario.nacionalidade) &
    estagiarioValidation.validarEstadoCivil(estagiario.estadoCivil) &
    estagiarioValidation.validarCidade(estagiario.cidade) &
    estagiarioValidation.validarEstado(estagiario.estado) &
    estagiarioValidation.validarCep(estagiario.cep) &
    estagiarioValidation.validarFone(estagiario.fone) &
    estagiarioValidation.validarEmail(estagiario.email);
}

module.exports = Router;
/*
function isEmpyt(value){
    return (!value || typeof value == undefined || value == null);
}

function isMinimunCharacter(value){
    return value.length >= 3; 
}

function validarTamanho(value){
    return !isEmpyt(value) && isMinimunCharacter(value);
}

function validarNome(nome){
    return validarTamanho(nome);
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
    return validarTamanho(registroAcademico);
};

function validarCurso(curso){
    return validarTamanho(curso);
};

function validarTurno(turno){
    return validarTamanho(turno);
};

function validarCedulaDeIdentidade(cedulaDeIdentidade){
    return validarTamanho(cedulaDeIdentidade);
};

function validarCpf(cpf){

    if (isEmpyt(cpf)){
        return false;
    }

    let cpfArray = [];
    let i;
    let element;

    for(i = 0; i < cpf.length; i++){
        element = parseInt(cpf[i]);
        if(!(element >= 0 && element <= 9) || cpfArray.length > 11){
            return false;
        }
        cpfArray.push(element);
    }

    if(cpfArray.length < 11){
        return false;
    }

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
    return validarTamanho(nacionalidade);
};

function validarEstadoCivil(estadoCivil){
    return validarTamanho(estadoCivil);
};

function validarCidade(cidade){
    return validarTamanho(cidade);
};

function validarEstado(estado){
    return validarTamanho(estado);
};

function validarCep(cep){
    return validarTamanho(cep);
};

function validarFone(fone){

    if(isEmpyt(fone)){
        return false;
    }

    let foneArray = [];
    let i;
    let element;

    for(i = 0; i < fone.length; i++){
        element = parseInt(fone[i]);
        if(!(element >= 0 && element <= 9) || foneArray.length > 11){
            return false;
        }
        foneArray.push(element);
    }

    if(foneArray.length < 10){
        return false;
    }

    return true;
};

function validarEmail(email){
    return validarTamanho(email) && email.indexOf("@") != -1;
};
*/