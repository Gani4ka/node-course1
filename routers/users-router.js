const express = require("express");
const router = express.Router();

const usersRouterController = require("../helpers/users-router-controller");
const authCheck = require("../middlewares/authorization");

router.post("/registr", async (req, res) => {
  const data = req.body;

  const result = await usersRouterController.postUser(data);
  res.status(result.status).send(result.data);
});

router.get("/login", authCheck, async (req, res) => {
  const data = req.body;

  const result = await usersRouterController.getUser(data);
  res.status(result.status).send(result.data);
});

router.delete("/:id", authCheck, async (req, res) => {
  const id = req.params.id;

  const result = await usersRouterController.logoutUser(id);
  res.status(result.status).send(result.data);
});

router.get("/current", authCheck, async (req, res) => {
  const id = req.user.id;

  const result = await usersRouterController.getCurrentUser(id);
  res.status(result.status).send(result.data);
});

module.exports = router;
