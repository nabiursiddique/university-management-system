import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

//* creating a semester
const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

//* Getting all the semester
const getAllSemesters: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllSemestersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic semesters are retrived',
    data: result,
  });
});

//* Getting single semester by _id
const getSingleSemester: RequestHandler = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleSemesterFromDB(semesterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic semesters are retrived',
    data: result,
  });
});

//* Updating single academic semester
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemester,
  updateAcademicSemester,
};
