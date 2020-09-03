const joi = require("joi");
const express = require("express");
const router = express.Router();

const validate = require("../helpers/validator.js");

const {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../contacts.js");

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  if (contacts instanceof Array) res.send(JSON.stringify(contacts));
  else res.status(400).send("data not found");
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const contact = await getContactById(id);
  if (contact instanceof Object) res.send(JSON.stringify(contact));
  else res.status(404).send(JSON.stringify({ message: "Not found" }));
});

router.post("/", async (req, res) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().required(),
    phone: joi.string().min(7).required(),
  });

  const validation = validate(schema, req.body);

  if (validation) {
    const { name, email, phone } = req.body;

    const result = await addContact(name, email, phone).then(
      (data) => data[data.length - 1]
    );

    res.status(201).send(result);
  } else {
    res.status(400).send(
      JSON.stringify({
        message: "missing required name field or not valid data",
      })
    );
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const result = await removeContact(id);

  if (result) {
    res.send({ message: "contact deleted" });
  } else res.status(404).send({ message: "Not found" });
});

router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const body = req.body;

  if (Object.keys(body).length === 0) {
    res.status(400).send({ message: "missing fields" });
    return;
  }

  const schema = joi.object({
    name: joi.string().min(3),
    email: joi.string(),
    phone: joi.string().min(7),
  });

  const validation = validate(schema, body);

  if (validation) {
    const result = await updateContact(id, body);
    res.send(JSON.stringify(result));
  } else res.status(400).send({ message: "failed fields validation" });
});

module.exports = router;
