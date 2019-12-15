const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
} else if (process.argv.length === 4) {
  console.log('the number of arguments must be 3 or 5');
  process.exit(1);
}

const password = process.argv[2];
const dbName = 'phonebook';
const url = `mongodb+srv://fullstack:${password}@cluster0-hllsn.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// if the number of arguments is equal to 3: "node mongo.js <password>"
// then print all record
if (process.argv.length === 3) {
  console.log(`${dbName}:`);
  Person.find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })
    .then(() => {
      process.exit(0);
    });
}

// if the number of arguments is equal to or larger than 5: "node mongo.js <password> <name> <number>"
// then create new record
const newName = process.argv[3];
const newNumber = process.argv[4];

const person = new Person({
  name: newName,
  number: newNumber,
});

person.save()
  .then(() => {
    console.log(`Added ${newName} number ${newNumber} to ${dbName}`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });

