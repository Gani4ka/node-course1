const express = require("express");
const morgan = require("morgan");
const path = require("path");
const config = require("./config");
const { send } = require("process");
const usersRouter = require("./routers/contacts-router.js");

const app = express();
const port = 3000;

app.use(morgan("tiny"));
app.use(express.urlencoded());
app.use(express.json());

app.use("/", usersRouter);
// app.get("/", (request, response) => {
//   response.send("Hello from Express!");
// });

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).send(err);
  }

  next();
});

app.listen(config.port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
