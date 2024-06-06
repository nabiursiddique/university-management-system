import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {},
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
