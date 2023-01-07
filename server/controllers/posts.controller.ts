import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import * as postsServices from '../services/posts.service';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postsServices.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
};

export const getOnePost = async (req: Request, res: Response) => {
  try {
    const post = await postsServices.getOnePost(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const newPost = await postsServices.createPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).send(getErrorMessage(error));
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const updatedPost = await postsServices.updatePost(req.body, req.params.id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    await postsServices.deletePost(req.params.id);
    res.status(200).send('Post deleted!');
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
};
