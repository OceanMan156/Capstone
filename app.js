const app = express();
import shell from "shelljs";
import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;
const IMAGEPATH = "./tensor_flow/Samples"
let SESSIONS = [];
let DIRCONTENTS = [];
let TRAINPROGRESS = null;

//View engine
app.set('view engine', 'ejs');
app.set('views', 'routes');

app.use(express.static('public'));
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

function getAI(){
  let aihtml = shell.exec(`curl -X GET http://localhost:8080/ai `);
  console.log(aihtml);
}

app.get('/', (req, res) => {
  getImageFiles();
  getAI();
  res.render('index.ejs', {title: 'HOME', sessions: SESSIONS, files: DIRCONTENTS, trainProgress:TRAINPROGRESS});
});

app.get('/get_session', (req, res) => {
  SESSIONS = shell.exec(`curl -X GET http://127.0.0.1:8888/api/sessions?token=migi`).stdout;
  SESSIONS = JSON.parse(SESSIONS);
  res.redirect('/');
});

app.post('/create_session', (req, res) => {
  const body = {
    notebookname: req.body.notebook,
  }

  let test = shell.exec(`curl -d '${JSON.stringify(body)}' \
                          -H 'Content-Type: application/json' \
                          http://127.0.0.1:8080/session `).stdout;
  test = JSON.parse(test);
  TRAINPROGRESS = test.response;
  res.redirect(req.get('referer'));
});

app.get('/shell_test', (req, res) => {
  shell.echo("We in term");
  res.status(404).render('404', { title: '404' });
});
