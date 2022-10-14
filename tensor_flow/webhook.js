const app = express();
import express from "express";
import shell from "shelljs";
console.log("ARe we changing");
shell.exec("./startup.sh", {async: true});
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.get('/', (req, res) => {
  console.log("In Jupy container");
  res.json({respose: 'in progress'});
});
