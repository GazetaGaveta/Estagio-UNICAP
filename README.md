# **Em construção**

# Introdução

Aplicação Web para acompanhamento dos estágios realizados pelos estagiários estudantes de computação da unicap.

Projeto utilizando JavaScript, NodeJs, Handlebars(express-handlebars), Express, Body Parser e Bootstrap. O banco de dados usado é o MongoDB e a biblioteca Mongoose foi usada para manuzear o banco. Todas as bibliotecas, a não ser o Bootstrap, foram instaladas utilizando npm que vem por padrão na instalação do NodeJs. Instalação do Bootstrap foi realizada chamando os Scripts e Styles no código html do Handlebars, usando links diponibilizados no próprio site do [*Bootstrap*](https://getbootstrap.com/docs/5.1/getting-started/download/).  
![](/readmeImages/l9aDADq.png)

O projeto foi baseado nos conteúdos da playlist [*Curso de Node.js*](https://www.youtube.com/watch?v=LLqq6FemMNQ&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B), feita pelo canal 
[*Victor Lima - Guia do Programador*](https://www.youtube.com/channel/UC_issB-37g9lwfAA37fy2Tg).

# Funcionalidades Atuais

 - **Cadastro de Estagiário:** Uma rota com um formulário para o cadastro de estagiários e envio das informações para o banco de dados. Todos os campos possuem uma validação para identificar se estão em branco e se possuem mais de 3 caracteres.  
 Não foi implementado nenhuma mensagem de erro informando ao usuário os campos digitados incorretamente.  
 Os campos com datas verificam se a data digitada no formato dd/mm/AAAA.  
 Os campos com números de telefone verificam se o tamanho da String está entre 10 e 11 e se foram digitados apenas números.  
 Os campos com email verificam se existe algum *@* na String.

 - **Cadastro de Unidade Concedente:** Uma rota com um formulário para o cadastro de unidades concedentes e envio das informações para o banco de dados. Não foi implementada nenhuma validação nas informações.

 - **Cadastro de Estágio:** Uma rota com um formulário para o cadastro de estágios e envio das informações para o banco de dados. Não foi implementada nenhuma validação nas informações.

- **Lista de todos os Estagiários:** Uma rota com uma página que lista todos os estagiários registrados no banco, do mais recente ao mais antigo, baseado na data de registro.

- **Lista de todos os Estágios:** Uma rota com uma página que lista todos os estágios registrados no banco, do mais recente ao mais antigo, baseado na data de registro.  
Também Calcula quantos dias de estágio já se passaram da data de vigência até a data atual (dias trabalhados). O calculo dos dias trabalhados não considera os finais de semana.
![](/readmeImages/eqXXqow.png)

- **Lista de todas as Unidades Concedentes:** Uma rota com uma página que lista todas as unidades concedentes registradas no banco, da mais recente a mais antiga, baseado na data de registro.

- **Barra de navegação:** Possui uma barra de navegação simples que permite ir para qualquer cadastro ou listagem. Opções default da barra de navegação ainda estão no código.  
![](/readmeImages/SNoC3j6.png)

# Models

A pasta [*models*](https://github.com/GazetaGaveta/Estagio-UNICAP/tree/main/models) possui os três arquivos JavaScript que definem a estrutura das Collections (ou tabelas, ou como você quiser chamar) no banco de dados.  
![](/readmeImages/7idICmn.png)
O estágio precisava estar ligado a uma unidade concedente e a um estagiário. Para fazer essa ligação, foram criados 2 campos, um para o estagiário e o outro para a unidade concedente, no model do estágio. Dessa forma, o estágio guarda uma cópia desses dois objetos.

# Routes e app.js

app.js Importa e inicia todas as rotas. Inicia o servidor. Inicia o express. Conecta ao banco de dados. Configura o Body Parser e o Handlebars.

O trecho de código a seguir conecta a aplicação ao banco de dados com o nome especificado na url do connect `mongodb://localhost:27017/<NOME>`.  
Cuidado! O mongoDB deve estar rodando na máquina.  
Se o banco de dados não existir, ele será criado automaticamente com o nome fornecido na url do connect.  
```javaScript
Mongoose.Promise = global.Promise;
try{
    Mongoose.connect("mongodb://localhost:27017/estagiarios");
    console.log("mongo conectado!");
}catch(err){
    console.log("Erro ao conectar: " + err);
}
```

Os conjuntos de rotas são encontratos na pasta [*routes*](). Um conjunto de rotas é um arquivo com várias rotas que se complementam ou trabalham juntas, e podem ser organizadas em um mesmo grupo.  
Existem 3 arquivos de conjuntos de rotas: um para as rotas que dizem respeito aos dados dos estagiários, um para as rotas que dizem respeito as unidades concedentes e um para as rotas que dizem respeito aos estágios.

Todos os nomes das raízes para os conjuntos de rotas são definidas no app.js baseando-se no código a serguir.  
```JavaScript
app.use('/estagiarios', Estagiario);
app.use('/estagios', Estagio);
app.use('/concedentes', UnidadeConcedente);
```   
Onde cada rota especifica, do conjunto de rotas, é chamado usando a url `localhost:<PORTA>/<NOME_RAIZ_CONJUNTO>/<NOME_DA_ROTA>`
![](/readmeImages/9jcH7JK.png)

# Views

A pasta [*views*]() contem os arquivos .handlebars para serem renderizados no site.  
Existe um aquivo com a página de cadastro e de listagem para estagiários, estágios e unidades concedentes.
A pasta [*layouts*]() contém o main.handlebars, onde são carregados os scripts e styles. O main é a base para todas as páginas utilizadas no projeto, e uma midificação no main afetará todas elas.  
Na pasta [*partials*]() está o arquivo da Barra de navegação.

Para usar o Bootstrap, só é necessário colocar as classes que deseja no elementos html que precisam ter determinada propriedade ou estilo. A [*documentação do Bootstrap*]() fornece o necessário para utilizar as classes e modelos prontos de elementos das páginas.