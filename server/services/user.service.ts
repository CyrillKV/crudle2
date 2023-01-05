import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../middleware/auth';


export async function registerUser (user: DocumentDefinition<UserDocument>): Promise<void> {
  try {
    await UserModel.create(user);
  } catch (error) {
    throw error;
  }
};

export async function loginUser (user: DocumentDefinition<UserDocument>) {
  try {
    const foundUser = await UserModel.findOne({ email: user.email });

    if (!foundUser) {
      throw new Error('Email is not registered!');
    }

    const isMatch = await bcrypt.compare(user.password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, SECRET_KEY, { expiresIn: '2 days'});
      return {...user , token: token};
    } else {
      throw new Error(`Password is not correct! ${isMatch}`);
    }

  } catch (error) {
    throw error;
  }
};