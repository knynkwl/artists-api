import {Router} from 'express'
import { createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist } from '../handlers/artists'
// import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update'
import { handleValidationErrors } from '../middleware/handleValidationErrors'
import { validateArtist } from '../middleware/validateArtist'

const apiRouter = Router()

/**
 * Product
 */
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
//   artistMiddleware.getById,
//   handleValidationErrors,
//   deleteArtist
// )

/**
 * Update
 */

// apiRouter.get('/update', getUpdates)
// apiRouter.get('/update/:id', getOneUpdate)
// apiRouter.put('/update/:id', 
//   body('title').optional(),
//   body('body').optional(),
//   body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
//   body('version').optional(),
//   updateUpdate
// )
// apiRouter.post('/update',
//   body('title').exists().isString(),
//   body('body').exists().isString(),
//   body('productId').exists().isString(),
//   createUpdate
// )
// apiRouter.delete('/update/:id', deleteUpdate)

// /**
//  * Update Point
//  */

// apiRouter.get('/updatepoint', () => {})
// apiRouter.get('/updatepoint/:id', () => {})
// apiRouter.put('/updatepoint/:id', 
//   body('name').optional().isString(), 
//   body('description').optional().isString(),
//   () => {}
// )
// apiRouter.post('/updatepoint', 
//   body('name').isString(), 
//   body('description').isString(),
//   body('updateId').exists().isString(),
//   () => {}
// )
// apiRouter.delete('/updatepoint/:id', () => {})

export default apiRouter