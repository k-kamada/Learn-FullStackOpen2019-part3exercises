const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const dateformat = require('dateformat');
const morgan = require('morgan');
const cors = require('cors');

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get('/api/persons', (req, res) => {
  res.send(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status('404').end();
  }
});

app.get('/info', (req, res) => {
  const formattedDate = dateformat(new Date());
  const content = `Phonebook has info for ${persons.length} people<br>${formattedDate}`;
  res.send(content);
});

const genRandomInt = (maxVar) => {
  return Math.floor(maxVar * Math.random());
}

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'both name and number are required'
    });
  }

  if (persons.find(person => person.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: genRandomInt(100000000),
  }

  persons = persons.concat(person);

  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(note => note.id !== id);
  res.status(204).end();
});

const unknownEndpoint = (req, res) => {
  res.status(400).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(3001);
