import { User as UserModel } from '@/domain/models';
import { Schema, Document, models, model, Model } from 'mongoose';

export interface IUser extends Document, Omit<UserModel, '_id'> { }

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: ['admin', 'client', 'super-user', 'SEO'],
      message: '{VALUE} no es un role válido',
      default: 'client',
    },
    required: true
  }
}, {
  timestamps: true
});

export const User = (models.User || model('User', userSchema)) as Model<IUser>;