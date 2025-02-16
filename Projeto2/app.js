const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const sequelize = require('./config/db');

const authRoute = require('./routes/authR');
const tTypeRoute = require('./routes/ticketTypeR');
const purchaseRoute = require('./routes/purchaseR');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/api/auth', authRoute);
app.use('/api/ticket-types', tTypeRoute);
app.use('/api/purchases', purchaseRoute);

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/history-purchases', (req, res) => {
  res.render('purchasesHistory');
});

app.get('/ticket/:id', (req, res) => {
  res.render('ticketDetail', { idTicket: req.params.id });
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor iniciado em http://localhost:3000');
  });
}).catch(err => console.error(err));
