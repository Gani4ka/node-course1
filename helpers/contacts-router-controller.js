const {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../contacts.js");

class contactsRouterController {
  async getUsers() {
    this.contacts = await listContacts();
    if (this.contacts instanceof Array)
      return {
        data: JSON.stringify(this.contacts),
        status: 200,
      };
    else
      return {
        data: "data not found",
        status: 400,
      };
  }

  async getUserById(id) {
    this.contact = await getContactById(id);
    if (this.contact instanceof Object)
      return {
        data: JSON.stringify(this.contact),
        status: 200,
      };
    else
      return {
        data: "user not found",
        status: 400,
      };
  }

  async removeContact(id) {
    this.result = await removeContact(id);

    if (this.result) {
      return {
        data: JSON.stringify(this.result),
        status: 200,
      };
    } else
      return {
        data: { message: "Not found" },
        status: 404,
      };
  }

  async postContact(data) {
    const { name, email, phone } = data;

    this.result = await addContact(name, email, phone);

    if (this.result.errors || this.result instanceof Error)
      return {
        data: JSON.stringify({
          message: this.result.errors,
        }),
        status: 400,
      };
    else {
      return {
        data: JSON.stringify(this.result),
        status: 201,
      };
    }
  }

  async updateContact(id, data) {
    this.result = await updateContact(id, data);

    if (!this.result || this.result.errors || this.result instanceof Error)
      return {
        data: JSON.stringify(this.result.errors + this.result.message),
        status: 404,
      };
    else
      return {
        data: JSON.stringify(this.result),
        status: 200,
      };
  }
}

module.exports = new contactsRouterController();
