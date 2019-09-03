const express = require('express');
const methodOverride = require('method-override');

const app = express();
const db = require('./models')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////
app.get('/', (req, res) => {
    db.widget.findAll()
    .then(widgets => {
        res.render('index', {
            widgets: widgets
        })
    })
})

app.post('/', (req, res) => {
    db.widget.findOrCreate({
        where: {
            description: req.body.description,
            quantity: req.body.quantity
        }
    }).then(widget => {
        res.redirect('/')
    })
   
})



// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
