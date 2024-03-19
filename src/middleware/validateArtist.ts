import prismaClient from '../prismaClient'
import { body, param } from "express-validator"

export const validateArtist = {
  canCreate: 
    body('name')
      .notEmpty().withMessage('Name is required.')
      .isAlpha().withMessage("The name should contain only letters.")
      .custom(async (value) => {
        try {
          const artist = await prismaClient.scf_artists.findUnique({
            where: {
              name: value
            }
          })
          if (artist) {
            return Promise.reject(`Artist with the name "${value}" already exists!`)
          }
        } catch (error) {
          console.error(error)
        }
      }),
    
  hasId: 
    param('id')
      .exists().withMessage('Id is required.')
      .custom(async (value) => {
        console.log('value', value);
        try {
          const artist = await prismaClient.scf_artists.findUnique({
            where: {
              id: value
            }
          })
          if (!artist) {
            console.error(`Artist not found with the ID ${value}`);
            return Promise.reject(`Artist not found.`)
          }
        } catch (error) {
          console.error(error)
        }
      }),

  canUpdate:
    body('name')
      .optional().isString().notEmpty().withMessage('Name is required.')
      .custom((fields, { req }) => {
        for (const field of fields) {
          if (req.body[field] && req.body[field].trim() !== '') {
            return false;
          }
        }
        
        return true;
      }).withMessage('All fields are empty')
}