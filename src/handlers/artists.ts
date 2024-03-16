import { Request, Response } from 'express'
import prisma from "@/src/db"

interface UserArtistRequest extends Request {
  user: {
    id: string
  }
}


function handleResponse(data: unknown, res: Response) {
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

export const getAllArtist = async (req: Request, res: Response) => {
  const artists = await prisma.artist.findMany({})

  handleResponse(artists, res)
}

export const getArtistById = async (req: Request, res: Response) => {
  const artist = await prisma.artist.findUnique({
    where: {
      id: req.params.id
    }
  })

  handleResponse(artist, res)
}

export const createArtist = async (req: UserArtistRequest, res: Response) => {
  const artists = await prisma.artist.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id
    }
  })
  
  handleResponse(artists, res)
}

export const deleteArtist = async (req: UserArtistRequest, res: Response) => {
  const deleted = await prisma.artist.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id
      }
    }
  })

  handleResponse(deleted, res)
}