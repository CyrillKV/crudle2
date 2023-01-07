import { ObjectId, ObjectIdLike } from 'bson';
import mongoose, { DocumentDefinition } from 'mongoose';
import PostModel, { PostDocument } from '../models/post.model';


type ID = string | number | Buffer | Uint8Array | ObjectId | ObjectIdLike;

export async function getPosts () {
  try {
    const posts = await PostModel.find();
    if (!posts) {
      throw new Error("Couldn't fetch posts?!");
    }
    return posts;
  } catch (error) {
    throw error;
  }
};

export async function getOnePost (_id: ID) {
  try {
    const post = await PostModel.findOne({ _id });
    if (!post) {
      throw new Error("Couldn't fetch posts?!");
    }
    return post;
  } catch (error) {
    throw error;
  }
};

export async function createPost (post: DocumentDefinition<PostDocument>) {
  try {
    await PostModel.create(post);
  } catch (error) {
    throw error;
  }
};

export async function updatePost(post: DocumentDefinition<PostDocument>, _id: ID) {
  try {
    if (!mongoose.isValidObjectId(_id)) {
      throw new Error('ID is not valid!');
    }
    const updatedPost = await PostModel.findByIdAndUpdate(_id, post, {new: true});
    return updatedPost;
  } catch (error) {
    throw error;
  }
};

export async function deletePost(_id: ID): Promise<void> {
  try {
    if (!mongoose.isValidObjectId(_id)) {
      throw new Error('ID is not valid!');
    }
    await PostModel.findByIdAndDelete(_id);
  } catch (error) {
    throw error;
  }
};

export async function upvotePost(post: DocumentDefinition<PostDocument>) {
  //TODO
}


/*export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with such id");

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.status(200).json(updatedPost);
};*/