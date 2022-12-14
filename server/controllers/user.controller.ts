import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as userServices from '../services/user.service';

export const register = async (req: Request, res: Response) => {
  try {
    await userServices.registerUser(req.body);
    res.status(200).send('Registration Successful!');
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const foundUser = await userServices.loginUser(req.body);
    //console.log('found user', foundUser.token);
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
};
