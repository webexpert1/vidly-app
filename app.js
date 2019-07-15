const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(helmet());


if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled');
}
const genres = [
    {id: 1, name: 'movies'},
    {id: 2, name: 'comedy'},
    {id: 3, name: 'horror'}
];
app.get('/', (req,res) => {
    res.send('First Get Endpoint');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("genre with given id not found")
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
   
    const{ error }  = validateGenre(req.body);

    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("genre with given id not found")
    
    const{ error }  = validateGenre(req.body);

    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    genre.name = req.body.name;
    res.send(genre);


})

app.delete('/api/gentes/:id', (Req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("genre with given id not found")
    
    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

// Port
const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Listening on port ${port}`));