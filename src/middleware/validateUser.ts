import prismaClient from '../prismaClient'
import { body, param } from "express-validator"

export const validateUser = {
  canCreate:
    body('name')
      .notEmpty().withMessage('Name is required.')
}