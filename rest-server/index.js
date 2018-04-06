require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const router = require('./routes');
const PORT = process.env.PORT;
require('./DB/index');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use('/api', router);
app.use(express.static(path.resolve(__dirname, '../client/public')));

app.listen(PORT, () => {
  console.log(`Successfully connected to PORT: ${PORT}`);
});
