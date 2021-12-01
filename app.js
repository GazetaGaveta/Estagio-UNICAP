// Carregamento de módulos
const Express = require("express");
const Handlebars = require("express-handlebars");
const BodyParser = require("body-parser");

const Mongoose = require("mongoose");
    // Routes
    const Estagiario = require("./routes/EstagiarioRoutes");
    const Estagio = require("./routes/EstagioRoutes");
    const UnidadeConcedente = require("./routes/UnidadeConcedenteRoutes");

// Iniciando express
const app = Express();

// Constantes
const PORT = 8080;

// Configurações
    // Body Parser
    app.use(BodyParser.urlencoded({extended: true}));
    app.use(BodyParser.json());
    // Handlebars
    app.engine('handlebars', Handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    // Mongoose
    Mongoose.Promise = global.Promise;
    try{
        Mongoose.connect("mongodb://localhost:27017/estagiarios");
        console.log("mongo conectado!");
    }catch(err){
        console.log("Erro ao conectar: " + err);
    }

// Rotas
app.use('/estagiarios', Estagiario);
app.use('/estagios', Estagio);
app.use('/concedente', UnidadeConcedente);

// Fazer o servidor escutar na porta. Listen(Sempre por ultimo)
app.listen(PORT, () => {
    console.log("Servidor rodando");
});