import { Response } from 'express'

export default function handleResponse(data: unknown, res: Response) {
  try {
    res.json(data)
  } catch (error) {
    if (error instanceof Error) {
      res.json({error: error.message})
    } else {
      res.json({error: 'An error occurred'})
    }
  }
}