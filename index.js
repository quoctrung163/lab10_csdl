const mongoose = require('mongoose');
const crud = require('./routes/crud');
const express = require('express');
const app = express();
const databaseName = 'crudsinhvien';
const bodyParser = require(`body-parser`);
const path = require(`path`);

// set template engine to using
app.set(`views`, `./views`);
app.set(`view engine`, `pug`);

mongoose.connect(`mongodb://localhost:27015/${databaseName}`, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongodb...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// use static file 
app.use(express.static(path.join(__dirname, `public`)));

// use body-parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/crud', crud);
app.get('/', (req, res, next) => {
  res.send('Hello World');
  next();
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));