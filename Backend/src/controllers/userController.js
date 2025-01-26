import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from '../errors/unauthenticated.js'
import UserModel from "../models/UserModel.js";
import validator from "validator";
import { StatusCodes } from "http-status-codes";

// Route for user Registration
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError(
      "Please provide all required fields (name, email, password)"
    );
  }
  if (!validator.isEmail(email)) {
    throw new BadRequestError("Please enter a valid email");
  }
  const user = await UserModel.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
// Route for user Login
const userLogin = async (req, res) => {
  const {email,password}=req.body;
  if(!email||!password){
    throw new BadRequestError('Please enter email and password')
  }

  const user=await UserModel.findOne({email});
  if(!user){
    throw new UnauthenticatedError('User does not exist');
  }

  const isPasswordCorrect=await user.comparePassword(password);
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token=user.createJWT();
  res.status(StatusCodes.OK).json({user:{name:user.name},token})
};

// Route for admin login
const adminLogin = async (req, res) => {};
export { userLogin, userRegister, adminLogin };
