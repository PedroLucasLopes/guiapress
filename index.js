const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//body parser p/ formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//home
app.get('/', (req, res) => {
    res.render('index');
});

//porta server
app.listen(8080, () => {
    console.log('running')
});