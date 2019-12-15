require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dateformat = require('dateformat');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('build'))

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(person => person.toJSON()));
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.get('/info', (req, res, next) => {
  Person.count({})
    .then(numberOfPerson => {
      const formattedDate = dateformat(new Date());
      const content = `Phonebook has info for ${numberOfPerson} people<br>${formattedDate}`;
      res.send(content);
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(400).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    if (error.errors.name) {
      return res.status(400).send({ error: `${error.errors.name.message}`});
    } else if (error.errors.number){
      return res.status(400).send({ error: `${error.errors.number.message}`});
    }
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}.`);
});
