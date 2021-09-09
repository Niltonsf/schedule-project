// Vaviaveis de ambiente que não queremos postar
require('dotenv').config();

// Inicializado express
const express = require('express');
const app = express();

// Inicializado o mongoose, modela o banco de dados de forma correta
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.emit('db is ready');
    })
    .catch(e => console.log(e));

// Identificar o navegador do cliente, cookies, etc
const session = require('express-session');

// Para falar que as sessões vão ser salvas no banco de dados
const MongoStore = require('connect-mongo');

// São mensagens flash, são salvas apenas 1 vez, apos ler essa mensagem, ela some
const flash = require('connect-flash');

// Rotas da nossa aplicação
const routes = require('./routes');

// Pra trabalhar com caminhos
const path = require('path');

// Segurança
const helmet = require('helmet');
// Tokens de segurança para formulários
const csrf = require('csurf');

// Middlewares
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middleware/middleware');

//app.use(helmet()); Usar apenas em produçao, pois pode causar conflito com css ou js

// Indica que podemos postar formularios pra dentro da aplicação
app.use(express.urlencoded({ extended: true }));
// Indica que podemos usar json na aplicação
app.use(express.json());

// Arquivos estaticos que devem ser acessados imagens, css, etc
app.use(express.static(path.resolve(__dirname, 'public')));


// Configurações de sessão
const sessionOptions = session({
    secret: 'dsabndlikashvbdkvh12832167dbasdvyhait6f12',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

// Arquivos html que renderizamos na tela
app.set('views', path.resolve(__dirname, 'src', 'views'));
// Arquivo de renderização de javascript em html
app.set('view engine', 'ejs');

// Inicializa csurf
app.use(csrf());

// Nossos middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

// Apos validação do db, inicializa na porta 3000
app.on('db is ready', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
});