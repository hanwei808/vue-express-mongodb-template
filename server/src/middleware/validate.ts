import { validationResult, buildCheckFunction, ValidationChain } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const validate: (validations: ValidationChain[]) => ValidationMiddleware = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

export const isValidObjectIdMiddleware = (location: any, fields: string | string[]): ValidationChain => {
  return buildCheckFunction(location)(fields).custom(async (value) => {
    if (!isValidObjectId(value)) {
      throw new Error('ID 不是一个有效的 ObjectID');
    }
  });
};
