const mongoose = require("mongoose");
const joi = require("joi");

const ContactsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    validate: {
      validator(email) {
        const { error } = joi.string().email().validate(email);

        if (error) throw new Error("Email not valid");
      },
    },
  },
  phone: { type: String },
});

module.exports = mongoose.model("contacts", ContactsSchema);
