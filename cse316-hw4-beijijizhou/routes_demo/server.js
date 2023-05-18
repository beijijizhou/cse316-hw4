const express = require('express');
const wiki = require('./router/wiki.js');
const main = require('./router/main.js');
const app = express();
const port = 8000;

app.use('/wiki', wiki);
app.use('/main', main);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
