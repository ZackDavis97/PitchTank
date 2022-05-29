import mongoose from "mongoose";
import userSchema from "../schemas/user.schema";

const bcrypt = require("bcrypt");

const Register = new mongoose.model("User", userSchema);

export default class RegisterUser {
  async register(req, res) {
    const { email, name, password } = req.body;
    try {
      const user = await Register.findOne({ email: email });
      if (user) {
        res.json({
          status: "error",
          text: "User already exist",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Register.create({
          email: email,
          name: name,
          password: hashedPassword,
        });

        delete newUser.password;

        res.json({
          status: "success",
          text: "User created successfully",
          user: newUser,
        });
      }
    } catch {
      res.json({
        status: "error",
        text: "Something went wrong",
      });
    }
  }
}
