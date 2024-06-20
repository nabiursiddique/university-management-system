import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(15, {
      message: 'Maximum allowed length for first name is 15 characters',
    })
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }).trim(),
});

const createGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: "Father's name is required" })
    .trim(),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father's contact number is required" }),
  motherName: z
    .string()
    .min(1, { message: "Mother's name is required" })
    .trim(),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother's contact number is required" }),
});

const createLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Local guardian's name is required" })
    .trim(),
  occupation: z
    .string()
    .min(1, { message: "Local guardian's occupation is required" }),
  contactNo: z
    .string()
    .min(1, { message: "Local guardian's contact number is required" }),
  address: z
    .string()
    .min(1, { message: "Local guardian's address is required" }),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .max(20, { message: "Password can't be more than 20 characters" })
      .optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({
          message: 'Gender must be either "male" or "female"',
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email format' }),
      contactNumber: z
        .string()
        .min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional()
        .refine((val) => val === undefined || val.length > 0, {
          message: 'Invalid blood group',
        }),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      // profileImg: z.string().optional(),
    }),
  }),
});

// update validation schema
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      // profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
