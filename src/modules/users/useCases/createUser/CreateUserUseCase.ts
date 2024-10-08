/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'tsyringe'

import { Role, User } from '@modules/users/models/User'
import { IHashProvider } from '@modules/users/providers/HashProvider/IHashProvider'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { v4 as uuid } from 'uuid'

interface IRequest {
  name: string
  email: string
  password: string
  role: Role
  phoneNumber: string
  avatarUrl?: string
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    name,
    password,
    phoneNumber,
    role,
    avatarUrl,
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const hashPassword = await this.hashProvider.generateHash(password)

    const payloadUser = {
      email,
      name,
      phoneNumber,
      role,
      avatarUrl,
      clientId: role.includes('client') ? uuid() : null,
      providerId: role.includes('provider') ? uuid() : null,
      password: hashPassword,
    }

    const user = await this.usersRepository.create(payloadUser)

    return user
  }
}

export { CreateUserUseCase }
