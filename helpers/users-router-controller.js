const { addUser, getUser } = require("../users.js");
const usersModel = require("../db/ScemaUsers");

class usersRouterController {
  async postUser(data) {
    const { email, password } = data;

    this.result = await addUser(email, password);

    if (this.result instanceof Error && this.result.errors)
      return {
        data: JSON.stringify({
          message: this.result.errors || this.result.message,
        }),
        status: 400,
      };
    else if (this.result instanceof Error && this.result.message)
      return {
        data: JSON.stringify({
          message: this.result.message,
        }),
        status: 409,
      };
    else {
      return {
        data: JSON.stringify(this.result),
        status: 201,
      };
    }
  }

  async getUser(data) {
    const { email, password } = data;

    this.result = await getUser(email, password);

    if (this.result instanceof Error && this.result.errors) {
      return {
        data: JSON.stringify({
          message: this.result.errors,
        }),
        status: 400,
      };
    } else if (this.result instanceof Error && this.result.message) {
      return {
        data: JSON.stringify({
          message: this.result.message,
        }),
        status: 401,
      };
    } else {
      return {
        data: JSON.stringify(this.result),
        status: 201,
      };
    }
  }

  async logoutUser(id) {
    const user = await usersModel.findById(id);
    if (!user) {
      return {
        data: JSON.stringify({
          message: "no such user",
        }),
        status: 401,
      };
    }
    await user.deleteToken(id);
    return {
      data: JSON.stringify({
        userId: user.id,
      }),
      status: 204,
    };
  }

  async getCurretUser(id) {
    const user = await usersModel.findById(id);

    if (!user) {
      return {
        data: JSON.stringify({
          message: "no such user",
        }),
        status: 401,
      };
    }

    return {
      data: JSON.stringify({
        userId: user.id,
        email: user.email,
        subscription: user.subscription,
      }),
      status: 200,
    };
  }
}

module.exports = new usersRouterController();
