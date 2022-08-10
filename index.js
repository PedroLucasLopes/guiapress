const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const userController = require('./User/userController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./User/User');

//view engine
app.set('view engine', 'ejs');

//sessions
app.use(session({
    secret: 'o9fjfiofashdfjkfhweoi9jf',
    cookie: {
        maxAge: 30000000
    }
}));

//static
app.use(express.static('public'));

//body parser p/ formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(() => {
        console.log('mysql working');
    })
    .catch((error) => {
        console.log(error);
    })

//Using routes of different files
app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', userController);

//home
app.get('/', (req, res) => {
    Article
        .findAll({
            order: [
                ['id', 'desc']
            ]
        })
        .then(articles => {
            Category
                .findAll()
                .then(categories => {
                    res.render('index', { articles: articles, categories: categories });
                });
        });
});

app.get('/:slug', (req, res) => {
    let slug = req.params.slug;
    Article
        .findOne({
            where: {
                slug: slug
            }
        })
        .then(article => {
            if (article != undefined) {
                Category
                    .findAll()
                    .then(categories => {
                        res.render('article', { article: article, categories: categories });
                    });
            } else {
                res.redirect('/');
            }
        })
        .catch(err => {
            res.redirect('/');
        });
});

app.get('/category/:slug', (req, res) => {
    let slug = req.params.slug;
    Category
        .findOne({
            where: {
                slug: slug
            },
            include: [{ model: Article }]
        })
        .then(category => {
            if (category != undefined) {
                Category
                    .findAll()
                    .then(categories => {
                        res.render('index', {
                            articles: category.articles,
                            categories: categories
                        })
                    })
            } else {
                res.redirect('/');
            }
        })
        .catch(err => {
            res.redirect('/');
        })
});

//porta server
app.listen(8080, () => {
    console.log('running');
});