const app = express();
import shell from "shelljs";
import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";
const PORT = 3000;

//View engine
app.set('view engine', 'ejs');
app.set('views', 'routes');

app.use(express.static('tensor_flow/Samples'));
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
  const status = shell.exec(`curl -X GET http://127.0.0.1:8888/api/sessions?token=test`);
  console.log(status);
  res.redirect('/');
});

app.get('/shell_test', (req, res) => {
  shell.echo("We in term");
  res.status(404).render('404', { title: '404' });
});
