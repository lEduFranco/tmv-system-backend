import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { Role, User } from '../models/User'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User | undefined>
  findByRole(role: Role): Promise<User[]>
  findAll(): Promise<User[]>
  delete(id: string): Promise<User | undefined>
  update(data: IUpdateUserDTO): Promise<User | undefined>
}

export { IUsersRepository }
