const express = require('express');

const app = express();
const history = require('connect-history-api-fallback');

const port = process.env.PORT || 3090;

app.use(history());

app.use(express.static(`${__dirname}/dist`));

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});
