const app = require('./server/server');

app.listen(process.env.PORT, () => {
  console.log('Listening');
});