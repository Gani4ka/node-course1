const fs = require("fs");
const path = require("path");
const contactsModel = require("./db/Scema");
const fsPromise = fs.promises;

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const users = await contactsModel.find();
    return users;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getContactById(contactId) {
  try {
    const data = await contactsModel.findById(contactId);
    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function removeContact(contactId) {
  try {
    const contact = await contactsModel.findById(contactId);

    if (!contact) return null;

    contact.remove();
    return contact;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function addContact(name, email, phone) {
  try {
    const contact = await contactsModel.create({
      name: name,
      email: email,
      phone: phone,
    });

    if (!contact) return null;
    return contact;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function updateContact(id, obj) {
  try {
    const contact = await contactsModel.findById(id);

    if (!contact) return null;

    Object.keys(obj).forEach((key) => {
      contact[key] = obj[key];
    });

    await contact.save();
    return await contact;
  } catch (e) {
    console.error(e);
    return e;
  }
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
