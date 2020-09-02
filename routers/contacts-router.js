const joi = require("joi");
const express = require("express");
const validate = require("../helpers/validator.js");
const router = express.Router();
const {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
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

    const result = await addContact(name, email, phone);

    res.status(201).send(result);
  } else {
    res.status(400).send(
      JSON.stringify({
        message: "missing required name field or not valid data",
      })
    );
  }
});

module.exports = router;
