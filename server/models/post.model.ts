import mongoose from 'mongoose';

export interface PostDocument extends mongoose.Document {
  title: string,
  image: string,
  message: string,
  createdBy: string,
  createdAt: Date,
  editedAt: Date,
  upvotes: string[]
};

const PostSchema: mongoose.Schema<PostDocument> = new mongoose.Schema({
  title: String,
  message: String,
  createdBy: String,
  image: String,
  upvotes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  editedAt: {
    type: Date,
    default: null,
  }
});

export default mongoose.model<PostDocument>('Post', PostSchema);