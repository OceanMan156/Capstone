const app = express();
import shell from "shelljs";
import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;
const IMAGEPATH = "./tensor_flow/Samples"
const NOTEBOOKSPATH = "./tensor_flow"
let SESSIONS = [];
let KERNELS = [];
let DIRCONTENTS = [];
let TRAINPROGRESS = null;
let NOTEBOOKS = null;

//View engine
app.set('view engine', 'ejs');
app.set('views', 'routes');

app.use(express.static('public'));
app.use(express.static('tensor_flow/Samples'));
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json())

shell.config.silent = true;

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
}

app.get('/', (req, res) => {
  getImageFiles();
  getAI();
  res.render('index.ejs', {title: 'HOME', kernels: KERNELS, sessions: SESSIONS, files: DIRCONTENTS, trainProgress:TRAINPROGRESS, notebooks: NOTEBOOKS});
});

app.get('/get_session', (req, res) => {
  SESSIONS = shell.exec(`curl -X GET http://127.0.0.1:8888/api/sessions?token=migi`).stdout;
  SESSIONS = JSON.parse(SESSIONS);
  res.redirect(req.get('referer'));
});

app.get('/API', (req, res) => {
  getImageFiles();
  getAI();
  res.render('function.ejs', {title: 'API', kernels: KERNELS, sessions: SESSIONS, files: DIRCONTENTS, trainProgress:TRAINPROGRESS, notebooks: NOTEBOOKS});
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
  res.redirect('/API');
});

app.post('/begin_gen', (req, res) =>{
  const body = {
    numImages: req.body.numImages,
  }
  let test = shell.exec(`curl -d '${JSON.stringify(body)}' \
                          -H 'Content-Type: application/json' \
                          http://127.0.0.1:8080/begin_gen `).stdout;
  res.redirect(req.get('referer'));
});

app.get('/get_notebooks', (req, res) => {
  shell.cd(NOTEBOOKSPATH)
  NOTEBOOKS = shell.exec("ls *.ipynb").stdout.trim().split("\n");
  shell.cd("../")
  res.render('function.ejs', {title: 'API', kernels: KERNELS, sessions: SESSIONS, files: DIRCONTENTS, trainProgress:TRAINPROGRESS, notebooks: NOTEBOOKS});
});

app.get('/get_kernels', (req, res) => {
  KERNELS = shell.exec(`curl -X GET http://127.0.0.1:8888/api/kernels?token=migi`).stdout;
  KERNELS = JSON.parse(KERNELS);
  res.redirect(req.get('referer'))
});

app.get('/create_kernels', (req, res) => {
  let test = shell.exec(`curl -X POST http://127.0.0.1:8888/api/kernels?token=migi`).stdout;
  test = JSON.parse(test);
  console.log(test);
  res.redirect(req.get('referer'))
});

app.get('/shell_test', (req, res) => {
  shell.echo("We in term");
  res.status(404).render('404', { title: '404' });
});

