// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Exclude } from 'class-transformer'

export type Role = 'admin' | 'staff' | 'client' | 'provider'

class User {
  id: string
  name: string
  email: string
  phoneNumber: string
  avatarUrl?: string
  role: Role

  @Exclude()
  password: string

  createdAt: Date
  updatedAt: Date
}

export { User }
