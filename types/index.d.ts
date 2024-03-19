import { Request } from 'express'
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string,any>
    }
  }
}

export interface User {
  id?: string
  username?: string
  createdAt?: Date
  email?: string
  password?: string | null
  artists?: Artist[]
}

export interface Artist {
  id: string
  name: string
  createdBy: string
  createdAt: string
  belongsToId: User
}

export interface UserRequest extends Request {
  user: {
    id?: string
    email?: string
    password?: string
  }
}