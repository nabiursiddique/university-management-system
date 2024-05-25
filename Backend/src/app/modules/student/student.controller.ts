import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

//* getting all the student from the database
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'All students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//* get single student from the database
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    if (result !== null) {
      res.status(200).json({
        success: true,
        message: `student with id ${studentId} retrieved successfully.`,
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `student with id ${studentId} not found.`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: `student with id ${studentId} is deleted successfully.`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
