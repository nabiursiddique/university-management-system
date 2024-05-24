import { Request, Response } from 'express';
import { StudentServices } from './student.service';

// creating student in the database
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    const result = await StudentServices.createStudentIntoDB(student);
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

// getting all the student from the database
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'All students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

// get single student from the database
const getSingleStudent = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
