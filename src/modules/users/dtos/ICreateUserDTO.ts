import { Role } from '../models/User'

interface ICreateUserDTO {
  name: string
  email: string
  password: string
  role: Role
  phoneNumber: string
  avatarUrl?: string
  clientId?: string
  providerId?: string
}

export { ICreateUserDTO }
