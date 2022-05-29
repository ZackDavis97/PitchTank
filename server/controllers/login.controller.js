import mongoose from "mongoose";
import userSchema from "../schemas/user.schema";

const bcrypt = require("bcrypt");

const User = new mongoose.model("User", userSchema);

export default class LoginController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.json({
          status: "error",
          text: "User not found",
        });
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          res.json({
            status: "error",
            text: "Invalid password",
          });
        } else {
          delete user.password;
          res.json({
            status: "success",
            text: "User logged in successfully",
            user: user,
          });
        }
      }
    } catch {
      res.json({
        status: "error",
        text: "Something went wrong",
      });
    }
  }
}
