import {Router} from 'express'
import { createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist } from '../handlers/artists'
import { handleValidationErrors } from '../middleware/handleValidationErrors'
import { validateArtist } from '../middleware/validateArtist'

const apiRouter = Router()

apiRouter.get('/artists', getAllArtists)

apiRouter.post('/artists', 
  validateArtist.canCreate,
  handleValidationErrors,
  createArtist
)

apiRouter.get('/artists/:id', 
  validateArtist.hasId,
  handleValidationErrors,
  getArtistById
)

apiRouter.put('/artists/:id', 
  validateArtist.hasId,
  validateArtist.canUpdate,
  handleValidationErrors, 
  updateArtist
)

// apiRouter.delete('/artists/:id', 
//   validateArtist.hasId,
//   handleValidationErrors,
//   deleteArtist
// )

export default apiRouter