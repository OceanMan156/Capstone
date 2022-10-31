const app = express();
import express from "express";
import shell from "shelljs";
console.log("ARe we changing");
shell.exec("../webhook/startup.sh", {async: true});
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.post('/session', (req, res) => {
  console.log("In Jupy container");
  shell.exec(`jupyter nbconvert --to script ${req.body.notebook}.ipynb`, 
    function (code, stdout,stderr){
      console.log(code);
      console.log(stdout);
      console.log(stderr);
  });
  res.json({respose: 'in progress'});
});
