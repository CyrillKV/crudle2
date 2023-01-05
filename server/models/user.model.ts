import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document {
  name: string,
  email: string,
  password: string,
  createdAt: Date
};

const UserSchema: mongoose.Schema<UserDocument> = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  createdAt: { type: Date, default: new Date() }
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export default mongoose.model<UserDocument>('User', UserSchema);