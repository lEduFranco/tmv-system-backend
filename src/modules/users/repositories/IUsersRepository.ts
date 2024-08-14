import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../models/User'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User | undefined>
}

export { IUsersRepository }
