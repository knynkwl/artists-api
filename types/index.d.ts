export interface User {
  id: string
  username: string
  createdAt: string
  email: string
  password: string
  artists: Artist[]
}

export interface Artist {
  id: string
  name: string
  belongsToId: string
  createdAt: string
  createdBy: User
}