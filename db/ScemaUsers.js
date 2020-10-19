const mongoose = require("mongoose");
const joi = require("joi");
const jsonWebToken = require("jsonwebtoken");

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator(email) {
        const { error } = joi.string().email().validate(email);

        if (error) throw new Error("Email not valid");
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
  verificationToken: String,
  avatarURL: String,
});

UsersSchema.method("generateAndSaveToken", async function () {
  const token = jsonWebToken.sign({ id: this._id }, "test");

  this.tokens.push({ token });

  await this.save();

  return token;
});

UsersSchema.method("deleteToken", async function () {
  await this.constructor.findByIdAndUpdate(
    this._id,
    { token: null },
    { strict: true }
  );
  return;
});

UsersSchema.static('findByVerificationToken', async function (
  verificationToken,
) {
  return this.findOne({
    verificationToken,
  });
});

UsersSchema.static('verifyUserEmail', async function (userId) {
  return this.findByIdAndUpdate(
    userId,
    { verificationToken: null },
    { strict: true },
  );
});

UsersSchema.pre("save", function () {
  if (this.isNew) {
    this.password = this.constructor.hashPasssword(this.password);
  }
});

module.exports = mongoose.model("users", UsersSchema);
