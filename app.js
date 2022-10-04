const app = express();
import shell from "shelljs";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs"

const PORT = 3000;
const IMAGEPATH = "./tensor_flow/Samples"
let SESSIONS = [];
let DIRCONTENTS = [];
let needReload;

//View engine
app.set('view engine', 'ejs');
app.set('views', 'routes');

app.use(express.static('tensor_flow/Samples'));
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json())

const server = app.listen(PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

function getImageFiles(){
  shell.cd(IMAGEPATH);
  DIRCONTENTS = shell.exec(`ls *.png`).stdout.trim().split("\n");
  shell.cd("../../");
}

app.get('/', (req, res) => {
  getImageFiles();
  res.render('index.ejs', {title: 'HOME', sessions: SESSIONS, files: DIRCONTENTS});
});

app.get('/get_session', (req, res) => {
  SESSIONS = shell.exec(`curl -X GET http://127.0.0.1:8888/api/sessions?token=test`).stdout;
  SESSIONS = JSON.parse(SESSIONS);
  res.redirect('/');
});

// app.post('/create_session', (req, res) => {
//   SESSIONS = shell.exec(`curl -X GET http://127.0.0.1:8888/api/sessions?token=test`).stdout;
//   SESSIONS = JSON.parse(SESSIONS);
//   res.redirect('/');
// });

app.get('/shell_test', (req, res) => {
  shell.echo("We in term");
  res.status(404).render('404', { title: '404' });
});
