const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'

const app = express();
app.use(morgan(morganSetting))
// or just app.use(cors())
app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);
const PORT = process.env.PORT || 3000;

app.get('/api/*', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };