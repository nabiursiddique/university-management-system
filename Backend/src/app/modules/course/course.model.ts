import { Schema, model } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

const PreRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const CourseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [PreRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Course = model<TCourse>('Course', CourseSchema);
