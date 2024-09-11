import { inject, injectable } from 'tsyringe'

import { Role, User } from '@modules/users/models/User'

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  role: Role
}

@injectable()
class GetUserByRoleUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ role }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findByRole(role)

    if (!users) {
      throw new AppError('User not found', 404)
    }

    return users
  }
}

export { GetUserByRoleUseCase }
