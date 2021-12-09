const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

/*
(a)	Natureza:		(     ) Obrigatório			(     )  Não Obrigatório 
(b)	Vigência: de       a      , podendo ser denunciado a qualquer tempo, unilateralmente, mediante comunicação escrita endereçada aos demais signatários deste Termo.
(c)	Dias e Horário:      .  Total:       horas/dia e       horas/semanais.
(d)	Local de Realização do Estágio:      
(e)	Supervisor da Unidade Concedente:       	Cargo:          
(f)	Apólice de Seguro nº:       da Seguradora:      
(g)	Bolsa-Estágio: R$       (     );
(h)	Auxílio-Transporte: R$       (     ).
(i)	Datas de Avaliação Acadêmica: de acordo com o Calendário Escolar Oficial da UNICAP, de conhecimento das Partes.
(j)	Período de Férias Escolares: janeiro e julho.
(k)	Recesso do Estagiário: será concedido nos termos do art. 13 da Lei n° 11.788/2008.
(l)	Plano de Atividades:
Principais Atividades:        
*/

const Estagio = new Schema({
    natureza: {
        type: String,
        required: true
    },
    vigenciaInicial: {
        type: String,
        required: true
    },
    vigenciaFinal: {
        type: String,
        required: true
    },
    dias: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    qtdhorasDiarias: {
        type: String,
        required: true
    },
    qtdHorasSemanais: {
        type: String,
        required: true
    },
    local: {
        type: String,
        required: true
    },
    supervisor: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    apoliceDeSeguro: {
        type: String,
        required: true
    },
    seguradora: {
        type: String,
        required: true
    },
    bolsaEstagio: {
        type: String,
        required: true
    },
    auxilioTransporte: {
        type: String,
        required: true
    },
    planoDeAtividades: {
        type: String,
        required: true
    },
    estagiario:{
        type: Object
    },
    registerDate: {
        type: Date,
        default: Date.now()
    }
});

Mongoose.model("estagios", Estagio);
