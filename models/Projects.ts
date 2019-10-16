import mongoose, { Schema, Document, Model } from 'mongoose';
import { isURL } from 'validator';

export interface IProject extends Document {
  name: string;
  url: string;
  type: string; // enum
  slug: string;
  isPublic: boolean;
}

export interface IProjectModel extends Model<IProject> {
  bySlug(slug: string): IProject
}

const ProjectSchema:Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 60,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    default: 'ISSUE',
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 32
  },
  isPublic: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
})

ProjectSchema.statics.bySlug = async function (slug: string) {
  return this.findOne().where({
    slug: slug
  })
}

const Project = mongoose.model<IProject, IProjectModel>('Project', ProjectSchema)

export default Project