import mongoose, { Schema, Document, Model } from 'mongoose';
import { isEmail } from 'validator';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  byEmail(email: string): IUser
}

const UserSchema:Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 60,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: isEmail,
    }
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

UserSchema.statics.byEmail = async function (email:string) {
  return this.findOne().where({
    email: email
  })
}

const User = mongoose.model<IUser, IUserModel>('User', UserSchema)

export default User