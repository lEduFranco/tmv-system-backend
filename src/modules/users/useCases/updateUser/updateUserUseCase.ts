import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { Role, User } from '@modules/users/models/User'

interface IRequest {
  id: string
  name: string
  email: string
  phoneNumber: string
  avatarUrl: string
  role: Role
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(data.id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const newUser = await this.usersRepository.update({ ...user, ...data })

    return newUser
  }
}

export { UpdateUserUseCase }
