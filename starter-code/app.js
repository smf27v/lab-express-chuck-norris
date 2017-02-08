const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

//Tenemos que declarar esto sí o sí.  Golpe de Remo.
app.set('views', __dirname + "/views");
//Esto también lo tenemos que declarar sí o sí.  Golpe con dos Remos.
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'joke-by-category');

app.get('/random', (req, res) => {

  client.getRandomJoke().then(function (response) {
      // console.log(response.value);
      let data = {};
      data.random = response.value;
      res.render('index', data);
  }).catch(function (err) {
      res.send(err);
  });

});

app.get('/categories', (req, res) => {

  client.getJokeCategories().then(function (categories) {
      // console.log(categories);
      let cat = {};
      cat.catList = categories;
      // console.log(cat);
      res.render('categories', cat);
  }).catch(function (err) {
      res.send(err);
  });

});



app.get('/', (req, res) => {

  client.getRandomJoke(req.params.category).then(function (response) {
      // console.log(response.value);
      let data = {};
      data.random = response.value;
      res.render('joke-by-category', data);
  }).catch(function (err) {
      res.send(err);
  });

});



app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});
