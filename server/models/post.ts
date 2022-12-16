import mongoose from 'mongoose';

interface IPost{
  title: string,
  message: string,
  creator: string,
  name: string,
  tags: string[],
  selectedFile: string,
  likes: string[],
  createdAt: Date,

}
const postSchema = new mongoose.Schema<IPost>({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
});

export default mongoose.model<IPost>('PostMessage', postSchema);