import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../middleware/auth';


export async function register (user: DocumentDefinition<UserDocument>): Promise<void> {
  try {
    await UserModel.create(user);
  } catch (error) {
    throw error;
  }
};

export async function login (user: DocumentDefinition<UserDocument>) {
  try {
    const foundUser = await UserModel.findOne({ email: user.email });

    if (!foundUser) {
      throw new Error('Email is not registered!');
    }

    const isMatch = bcrypt.compareSync(user.password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, SECRET_KEY, { expiresIn: '2 day'});
      return {user: { _id: user._id, name: user.name}, token: token};
    } else {
      throw new Error('Password is not correct!');
    }

  } catch (error) {
    throw error;
  }
};