const fs = require("fs");
const path = require("path");

const fsPromise = fs.promises;

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fsPromise
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data));
  return data;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((el) => el.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const data = await listContacts();

  const isContactExsist = data.find((el) => el.id === contactId);
  if (isContactExsist) {
    const newContacts = data.filter((el) => el.id !== contactId);
    const newContactsJson = JSON.stringify(newContacts);
    await fsPromise.writeFile(contactsPath, newContactsJson);
    return await listContacts();
  } else return;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContactId =
    data.map((contact) => contact.id).sort((a, b) => a - b)[data.length - 1] +
    1;

  const newContact = {
    id: newContactId,
    name: name,
    email: email,
    phone: phone,
  };
  const newContactsJson = JSON.stringify([...data, newContact]);
  await fsPromise.writeFile(contactsPath, newContactsJson);
  return await listContacts();
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
