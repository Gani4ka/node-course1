const express = require("express");
const router = express.Router();
const multer = require("../helpers/multer");

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

router.patch(
  "/avatars",
  authCheck,
  multer.single("avatar"),
  async (req, res) => {
    const user = req.user;
    const payload = req.file.path;

    const result = await usersRouterController.patchUser(user.id, payload);
    res.status(result.status).send(result.data);
  }
);

router.get(
  "/verify/:verificationToken", async (req, res) => {
    const token = req.params.verificationToken;
  
    const result = await usersRouterController.verifyEmail(token);
    res.status(result.status).send(result.data);
  }
);

module.exports = router;
