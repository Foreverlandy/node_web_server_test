const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');

app.use('/about',(req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) =>{
    if (error) {
      console.log('error occured when appending log to server.log file');
    }
  });
  next();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req, res) => {
  res.send('About page');
})

app.get('/bad', (req, res) => {
  res.send({
    errorMsg: 'Unable to handle request'
  });
})

app.listen(3000, () => {
  console.log('local server started at port 3000');
});
