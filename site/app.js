var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//NÃO ESQUECER DE REGISTRAR ODAS AS ROTAS AQUI

var cadastroRouter = require('./routes/cadastro');
var alterarClienteRouter = require('./routes/alterarEmpresa');
//var loginRouter = require('./routes/login');
var cadastroDispositivoRouter = require('./routes/cadastroDispositivo');
var consultaUserRouter = require('./routes/consultaUser');
var consultarDispositivosRouter = require('./routes/consultarDispositivos');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var dashPingRouter = require('./routes/dashPing');
var excluirRouter = require('./routes/excluir');
var alterarRouter = require('./routes/alterar');
var emailRouter = require('./routes/email');
var alterarSenhaRouter = require('./routes/alterarSenha');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cadastro', cadastroRouter);
app.use('/alterarEmpresa', alterarClienteRouter);
app.use('/cadastroDispositivo', cadastroDispositivoRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/consultaUser', consultaUserRouter);
app.use('/consultarDispositivos', consultarDispositivosRouter);
app.use('/dashPing', dashPingRouter);
app.use('/excluir', excluirRouter);
app.use('/alterar', alterarRouter);
app.use('/login', loginRouter);
app.use('/email', emailRouter);
app.use('/alterarSenha', alterarSenhaRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
