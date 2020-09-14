const joi = require("joi");
const validate = require("../helpers/validator.js");

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
    const schema = joi.object({
      name: joi.string().min(3).required(),
      email: joi.string().required(),
      phone: joi.string().min(7).required(),
    });

    const validation = validate(schema, data);

    if (validation) {
      const { name, email, phone } = data;

      this.result = await addContact(name, email, phone).then(
        (data) => data[data.length - 1]
      );

      if (this.result)
        return {
          data: JSON.stringify(this.result),
          status: 201,
        };
      else {
        return {
          data: JSON.stringify({
            message: "smth wrong",
          }),
          status: 400,
        };
      }
    } else {
      return {
        data: JSON.stringify({
          message: "missing required name field or not valid data",
        }),
        status: 400,
      };
    }
  }

  async updateContact(id, data) {
    if (Object.keys(data).length === 0) {
      return {
        data: JSON.stringify({ message: "missing fields" }),
        status: 400,
      };
    }

    const schema = joi.object({
      name: joi.string().min(3),
      email: joi.string(),
      phone: joi.string().min(7),
    });

    const validation = validate(schema, data);

    if (validation) {
      this.result = await updateContact(id, data);

      if (this.result)
        return {
          data: JSON.stringify(this.result),
          status: 200,
        };
      else
        return {
          data: JSON.stringify({ message: "no such user" }),
          status: 404,
        };
    } else
      return {
        data: JSON.stringify({ message: "failed fields validation" }),
        status: 400,
      };
  }
}

module.exports = new contactsRouterController();
