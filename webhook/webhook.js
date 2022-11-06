const app = express();
import express from "express";
import shell from "shelljs";
import bodyParser from "body-parser";
shell.exec("../webhook/startup.sh", {async: true});
const PORT = 8080;
let currentPromise = null;

let PROCESS_MSG = "In Progress"

app.use(bodyParser.json());

const server = app.listen(PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.post('/session', async (req, res) => {
  console.log(req.body);
  if(currentPromise == null){
    currentPromise = shell.exec(`jupyter nbconvert --to script '${req.body.notebookname}.ipynb' --execute`, { async:true });
    res.json({respose: "In Progress"});
  }else{
    if(PROCESS_MSG == "Completed"){
      currentPromise = null;
      PROCESS_MSG = "In Progress";
      res.json({respose: `Process Completed`});
    }
    if(currentPromise != null){
      currentPromise.on('exit', function (code, signal){
        console.log('Process ended with ' + `code ${code} and signal ${signal}`);
        PROCESS_MSG = "Completed"
      });
      res.json({response: `${PROCESS_MSG}`})
    }
  }
});

app.get('/ai', (req, res) => {
  let respose;
  if(!shell.test('-e', "Samples/Capstone_Ai.pdf")){
    respose = shell.exec(`jupyter nbconvert 'Capstone Ai.ipynb' --to pdf`);
    shell.exec(`mv 'Capstone Ai.pdf' Capstone_Ai.pdf`);
    shell.exec(`chmod 777 Capstone_Ai.pdf`);
    shell.exec(`mv Capstone_Ai.pdf Samples/Capstone_Ai.pdf`)
    res.json({respose: `${respose.stderr}`})
  }else
    res.json({respose: `File already Exists`})
});

