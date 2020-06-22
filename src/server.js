const knex = require('knex')
const app = require('./app')
const { PORT, DATABASE_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})
app.use(express.static('public'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,
    `/index.html`), function (err) {
    })
// })

// app.use(express.static('public'));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname,
//     `/index.html`), function (err) {
//     })
// })

// app.use(express.static('public'));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname,
//     `/index.html`), function (err) {
//     })
// })
// app.use(express.static('public'));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname,
//     `/index.html`), function (err) {
//     })
// })

// app.use(express.static('public'));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname,
//     `/index.html`), function (err) {
//     })
// })

// app.use(express.static('public'));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname,
//     `/index.html`), function (err) {
//     })
// })

// app.use(express.static('public'));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname,
//     `/index.html`), function (err) {
//     })
// })

// app.use(express.static('public'));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname,
//     `/index.html`), function (err) {
//       if (err) {
//         res.status(500).send(err)
//       }
//     })
// })


// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('/*', (req, res) => {
//   res.sendfile(path.join(__dirname,'build/index.html'));
// })


// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, 
//     `build/index.html`), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

app.set('db', db)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));