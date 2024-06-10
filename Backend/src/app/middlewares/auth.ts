import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // checking if the token is sent from the client
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }

    // checking if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // checking if the user exists or not
    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user not found!');
    }

    // checking if the user is already deleted
    const isUserIsDeleted = user?.isDeleted;
    if (isUserIsDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }

    // checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
