const express = require("express");
const router = express.Router();

const contactsRouterController = require("../helpers/contacts-router-controller");

router.get("/", async (req, res) => {
  const contacts = await contactsRouterController.getUsers();
  res.status(contacts.status).send(contacts.data);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const contact = await contactsRouterController.getUserById(id);
  res.status(contact.status).send(contact.data);
});

router.post("/", async (req, res) => {
  const data = req.body;

  const result = await contactsRouterController.postContact(data);
  res.status(result.status).send(result.data);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const result = await contactsRouterController.removeContact(id);
  res.status(result.status).send(result.data);
});

router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const result = await contactsRouterController.updateContact(id, body);
  res.status(result.status).send(result.data);
});

module.exports = router;
