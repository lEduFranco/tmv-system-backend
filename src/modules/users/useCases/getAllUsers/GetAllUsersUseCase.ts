import { inject, injectable } from 'tsyringe'

import { User } from '@modules/users/models/User'

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

@injectable()
class GetAllUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAll()

    return users
  }
}

export { GetAllUsersUseCase }
