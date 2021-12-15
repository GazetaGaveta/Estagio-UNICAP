const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

/*
Razão Social:      	CNPJ/MF      

Endereço:       Bairro:      

Cidade:       Estado:       CEP:        Fone(s):        e-mail:      

Representante Legal:       Cargo:      

Profissional Liberal – Registro Profissional nº:       Órgão:      
*/

const UnidadeConcedente = new Schema({
    //Pela forma como os papeis são preenchidos, parece ser o nome da unidade concedente.
    razaoSocial: {
        type: String,
        required: true
    },
    cnpjOuMf: {
        type: String,
        required: true
    },
    endereço: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    fone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    representanteLegal: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    profissionalRegistroOuLiberal: {
        type: String,
        required: true
    },
    orgao: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        default: Date.now()
    }
});

Mongoose.model("unidadesConcedentes", UnidadeConcedente);
