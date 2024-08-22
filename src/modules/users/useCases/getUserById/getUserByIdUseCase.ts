import { inject, injectable } from 'tsyringe'

import { User } from '@modules/users/models/User'

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  id: string
}

@injectable()
class GetUserByIdUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user
  }
}

export { GetUserByIdUseCase }
