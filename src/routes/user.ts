import {Router} from 'express'
import { 
  handleSignup, 
  handleSignin, 
  handleTolkienVerify, 
  handleTolkienResend, 
  inviteUser } from '../handlers/user'
import { validateUser } from '../middleware/validateUser'
import { handleValidationErrors } from '../middleware/handleValidationErrors'
import { protect, isAdmin } from '../utils/auth'

const userRouter = Router()

userRouter.put('/verify/:id/:tolkien',
  handleValidationErrors,
  handleTolkienVerify
)

userRouter.post('/invite',
  protect,
  isAdmin,
  handleValidationErrors,
  inviteUser
)

userRouter.post('/resend-invite',
  handleValidationErrors, 
  handleTolkienResend
)

userRouter.put('/set-password/:id',
  protect,
  handleValidationErrors,
  inviteUser
)

// userRouter.put('/reset-password',
//   protect,
//   handleResetPassword
// )

userRouter.put('/signup',
  handleValidationErrors,
  handleSignup
)

userRouter.post('/signin', 
  protect,
  handleSignin)
// userRouter.get('/all', getAllUsers)

export default userRouter