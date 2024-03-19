import express from 'express'
import morganMiddleware from './middleware/morganMiddleware'
import cors from 'cors'

import { protect } from './utils/auth'
import apiRouter from './routes/api'
import userRouter from './routes/user'
import rateLimiter from './middleware/rateLimiter'

const app = express()

app.use(cors())
app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
if(!protect) {
  app.use(rateLimiter)
}

app.get('/', (_req, _res, next) => {
  setTimeout(() => {
    next(new Error('Error from / route'))
  },1)
})

app.use('/api', protect, apiRouter)
app.use('/user', userRouter)

// app.use((err, req, res, next) => {
//   console.log(err)
//   res.json({message: `had an error: ${err.message}`})
// })

export default app