import mongoose from 'mongoose';

interface IUser {
  name: string,
  email: string,
  password: string,
  id: string,
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true},
  id: {type: String},
});

export default mongoose.model<IUser>('User', userSchema);