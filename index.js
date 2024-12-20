const express = require("express");
const fs = require("fs");
const expressStatusMonitor = require("express-status-monitor");
const zlip = require("zlip");
const app = express();
const PORT = 8000;

app.use(expressStatusMonitor());

fs.createReadStream("./sample.txt").pipe(
  zlip.createGzip().pipe(fs.createWriteStream("./sample.zip"))
);
app.get("/status", (req, res) => {
  res.send("Status: Server is running.");
});

app.get("/", (req, res) => {
  fs.readFile("./sample.txt", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
