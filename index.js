const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require(`body-parser`);
const methodOverride = require('method-override');

const home = require('./routes/home');
const path = require(`path`);
const databaseName = 'crudsinhvien';

// set template engine to using
app.set(`views`, `./views`);
app.set(`view engine`, `pug`);

mongoose.connect(`mongodb://localhost:27015/${databaseName}`,
  { useUnifiedTopology: true },
  { useNewUrlParser: true },
  { useFindAndModify: false }
)
  .then(() => console.log('Connected to Mongodb...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// use method override
app.use(methodOverride('_method'));

// use static file 
app.use(express.static(path.join(__dirname, `public`)));

// use body-parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));