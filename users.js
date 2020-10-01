const bcrypt = require("bcrypt");
const usersModel = require("./db/ScemaUsers");

async function addUser(email, password) {
  try {
    const isUserExist = await usersModel.find({ email });

    if (isUserExist.length === 0) {
      const hash = bcrypt.hashSync(password, 10);
      const user = await usersModel.create({
        email: email,
        password: hash,
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

module.exports = {
  addUser,
  getUser,
};
