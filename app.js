const express = require('express');
const app = express();
const shell = require('shelljs');
const PORT = 3000;
var bodyParser = require('body-parser')

//View engine
app.set('view engine', 'ejs');
app.set('views', 'routes');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json())
var docker_status;

const server = app.listen(PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.get('/', (req, res) => {
  res.render('index.ejs', {title: 'HOME'});
});

app.post('/load_docker', (req, res) => {
  var docker_name = req.body.Tensor;
  console.log("Backend of docker container")
  docker_status = shell.exec(`./host_volume/test.sh`)
  shell.echo(`${docker_status}`);
  res.redirect('/');
});

app.get('/shell_test', (req, res) => {
  shell.echo("We in term");
  res.status(404).render('404', { title: '404' });
});
