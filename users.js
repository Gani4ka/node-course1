const bcrypt = require("bcrypt");
const uuid = require("uuid").v4;
const path = require("path");
const jdenticon = require("jdenticon");
const { promises: fsPromises } = require("fs");

const usersModel = require("./db/ScemaUsers");

async function addUser(email, password) {
  try {
    const isUserExist = await usersModel.find({ email });

    if (isUserExist.length === 0) {
      const hash = bcrypt.hashSync(password, 10);

      const size = 200;
      const value = email;

      const png = jdenticon.toPng(value, size);

      const avatar = path.join(
        __dirname.replace("routers", ""),
        "public",
        "images",
        `${uuid()}.png`
      );
      await fsPromises.writeFile(avatar, png);

      const user = await usersModel.create({
        email: email,
        password: hash,
        avatarURL: avatar,
      });

      if (!user) return null;
      return user;
    } else return new Error("Email in use");
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getUser(email, password) {
  try {
    const user = await usersModel.findOne({ email });

    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (isPasswordValid) {
        const token = await user.generateAndSaveToken();

        return {
          token: token,
          user: {
            email: user.email,
            subscription: user.subscription,
            id: user.id,
          },
        };
      } else return new Error("Email or password is wrong");
    } else return new Error("Email or password is wrong");
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function updateUser(id, payload) {
  try {
    const user = await usersModel.findById(id);

    if (!user) return new Error("No such user");

    user.avatarURL = payload;

    await user.save();
    return await user;
  } catch (e) {
    console.error(e);
    return e;
  }
}

module.exports = {
  addUser,
  getUser,
  updateUser,
};
