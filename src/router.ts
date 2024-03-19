// import {Router} from 'express'
// import { createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist } from './handlers/artists'
// // import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update'
// import { handleValidationErrors } from './middleware/handleValidationErrors'
// import { validateArtist } from './middleware/validateArtist'

// const router = Router()

// /**
//  * Product
//  */
// router.get('/artists', getAllArtists)

// router.post('/artists', 
//   validateArtist.canCreate,
//   handleValidationErrors,
//   createArtist
// )

// router.get('/artists/:id', 
//   validateArtist.hasId,
//   handleValidationErrors,
//   getArtistById
// )

// router.put('/artists/:id', 
//   validateArtist.hasId,
//   validateArtist.canUpdate,
//   handleValidationErrors, 
//   updateArtist
// )

// // router.delete('/artists/:id', 
// //   artistMiddleware.getById,
// //   handleValidationErrors,
// //   deleteArtist
// // )

// /**
//  * Update
//  */

// // router.get('/update', getUpdates)
// // router.get('/update/:id', getOneUpdate)
// // router.put('/update/:id', 
// //   body('title').optional(),
// //   body('body').optional(),
// //   body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
// //   body('version').optional(),
// //   updateUpdate
// // )
// // router.post('/update',
// //   body('title').exists().isString(),
// //   body('body').exists().isString(),
// //   body('productId').exists().isString(),
// //   createUpdate
// // )
// // router.delete('/update/:id', deleteUpdate)

// // /**
// //  * Update Point
// //  */

// // router.get('/updatepoint', () => {})
// // router.get('/updatepoint/:id', () => {})
// // router.put('/updatepoint/:id', 
// //   body('name').optional().isString(), 
// //   body('description').optional().isString(),
// //   () => {}
// // )
// // router.post('/updatepoint', 
// //   body('name').isString(), 
// //   body('description').isString(),
// //   body('updateId').exists().isString(),
// //   () => {}
// // )
// // router.delete('/updatepoint/:id', () => {})

// export default router