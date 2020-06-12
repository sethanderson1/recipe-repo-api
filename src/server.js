const express = require('express');
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/api/*', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };