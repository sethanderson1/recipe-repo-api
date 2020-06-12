const express = require('express');
const morgan = require('morgan');
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'

const app = express();
app.use(morgan(morganSetting))

const PORT = process.env.PORT || 3000;

app.get('/api/*', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };