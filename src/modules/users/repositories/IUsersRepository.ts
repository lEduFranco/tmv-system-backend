import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { User } from '../models/User'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User | undefined>
  delete(id: string): Promise<User | undefined>
  update(data: IUpdateUserDTO): Promise<User | undefined>
}

export { IUsersRepository }
