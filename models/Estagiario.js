const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const Estagiatio = new Schema({
    nome: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: String,
        required: true
    },
    registroAcademico: {
        type: String,
        required: true
    },
    curso: {
        type: String,
        required: true
    },
    turno: {
        type: String,
        required: true
    },
    cedulaDeIdentidade: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    nacionalidade: {
        type: String,
        required: true
    },
    estadoCivil: {
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
    registerDate: {
        type: Date,
        default: Date.now()
    }
});

Mongoose.model("estagiarios", Estagiatio);