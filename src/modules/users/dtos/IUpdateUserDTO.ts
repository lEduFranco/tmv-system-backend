import { Role } from '../models/User'

interface IUpdateUserDTO {
  id: string
  name: string
  email: string
  role: Role
  phoneNumber: string
  avatarUrl?: string
  clientId?: string
  proderId?: string
}

export { IUpdateUserDTO }