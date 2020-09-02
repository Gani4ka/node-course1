const argv = require("yargs").argv;

const {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const contacts = require("./db/contacts.json");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((data) => console.table(data));
      break;

    case "get":
      getContactById(id)
        .then((data) => console.table(data))
        .catch((err) => console.log("some error:", err));
      break;

    case "add":
      addContact(name, email, phone)
        .then((data) => console.table(data))
        .catch((err) => console.log("some error:", err));
      break;

    case "remove":
      removeContact(id)
        .then((data) => console.table(data))
        .catch((err) => console.log("some error:", err));
      break;

    default:
      console.warn("Unknown action type!");
  }
}

invokeAction(argv);
