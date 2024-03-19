import { Request, Response } from "express";
import prismaClient from "../../prismaClient";


export const getUsers = async (_req: Request, res: Response) => {
  const users = await prismaClient.api_users.findMany()

  res.json(users)
}

export const getUserById = async (req: Request, res: Response) => {
  const user = await prismaClient.api_users.findUnique({
    where: {
      id: req.params.id
    }
  })

  res.json(user)
}

export const deleteUser = async (req: Request, res: Response) => {
  const user = await prismaClient.api_users.delete({
    where: {
      id: req.params.id
    }
  })

  res.json(user)
}

export const updateUser = async (req: Request, res: Response) => {
  const user = await prismaClient.api_users.update({
    where: {
      id: req.params.id
    },
    data: {
      name: req.body.name
    }
  })

  res.json(user)
}

export const getRoles = async (_req: Request, res: Response) => {
  const roles = await prismaClient.api_roles.findMany()

  res.json(roles)
}

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prismaClient.api_users.findMany()

  res.json(users)
}