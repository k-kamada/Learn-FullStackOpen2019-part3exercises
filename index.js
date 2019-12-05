const express = require('express');
const app = express();

const dateformat = require('dateformat');

const notes = [
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
  res.send(notes);
});

app.get('/info', (req, res) => {
  const formattedDate = dateformat(new Date());
  const content = `Phonebook has info for ${notes.length} people<br>${formattedDate}`;
  res.send(content);
});

app.listen(3001);
