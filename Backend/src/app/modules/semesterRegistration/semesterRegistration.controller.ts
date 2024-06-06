import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is created successfully',
      data: result,
    });
  },
);

const getALlSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {},
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {},
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {},
);

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getALlSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
