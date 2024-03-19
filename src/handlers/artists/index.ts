import { Request, Response } from 'express'
import prismaClient from "../../prismaClient"
import handleResponse from '../../utils/handleResponse'
import { UserRequest } from '@/types/index'
import { validationResult } from 'express-validator'

export const getAllArtists = async (req: Request, res: Response) => {
  const query = req.query
  const page = +(query.page as string) || 1
  const limit = +(query.limit as string) || 20;
  const offset = (page - 1) * limit;
  const orderby = query.orderby || 'asc'
  
  const artists = await prismaClient.$transaction([
    prismaClient.scf_artists.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        name: orderby
      } as any
    }),
    prismaClient.scf_artists.count()
  ])
  
  handleResponse(artists, res)
}

export const getArtistById = async (req: Request, res: Response) => {
  const artist = await prismaClient.scf_artists.findUnique({
    where: {
      id: req.params.id
    }
  })

  handleResponse(artist, res)
}

export const createArtist = async (req: Request, res: Response) => {
  try {
    const data = await prismaClient.scf_artists.create({
      data: {
        name: req.body.name,
        bio: req?.body.bio,
        country: req?.body.country,
        email: req?.body.email,
        website: req?.body.website,
        createdBy: req.user?.id
      }
    })

    res.json(data)
  } catch (error) {
    if (error instanceof Error) {
      res.json({error: error.message})
    } else {
      res.json({error: 'An error occurred'})
    }
  }
}

export const updateArtist = async (req: Request, res: Response) => {
  const data = await prismaClient.scf_artists.update({
    where: {
      id: req.params.id
    },
    data: {
      name: req?.body.name,
      bio: req?.body.bio,
      country: req?.body.country,
      email: req?.body.email,
      website: req?.body.website,
      updatedAt: new Date()
    }
  })

  handleResponse(data, res)
}

export const deleteArtist = async (req: UserRequest, res: Response) => {
  const deleted = await prismaClient.scf_artists.delete({
    where: {
      id: req.params.id
    }
  })

  handleResponse(deleted, res)
}