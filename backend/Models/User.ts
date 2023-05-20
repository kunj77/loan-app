import mongoose, { Schema } from 'mongoose';
import { User } from '../typings';

const userSchema: Schema = new Schema<User>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  collection: 'users'
});

export default mongoose.model<User>('User', userSchema);
