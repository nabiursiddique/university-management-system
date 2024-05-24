import { z } from 'zod';

const userNameValidationSchema = z.object({
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

const guardianValidationSchema = z.object({
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

const localGuardianValidationSchema = z.object({
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

const studentValidationSchema = z.object({
  id: z.string().min(1, { message: 'Student ID is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(20, { message: "Password can't be more than 20 characters" }),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Gender must be either "male" or "female"' }),
  }),
  dateOfBirth: z.string(),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  contactNumber: z.string().min(1, { message: 'Contact number is required' }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency contact number is required' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
    .optional()
    .refine((val) => val === undefined || val.length > 0, {
      message: 'Invalid blood group',
    }),
  presentAddress: z.string().min(1, { message: 'Present address is required' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent address is required' }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z
    .enum(['active', 'blocked'], {
      errorMap: () => ({
        message: 'Status must be either "active" or "blocked"',
      }),
    })
    .default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;
