import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'
import { User } from '@modules/users/models/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { prisma } from '@shared/infra/prisma'

class UsersRepository implements IUsersRepository {
  private repository: typeof prisma.user

  constructor() {
    this.repository = prisma.user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findFirst({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findFirst({
      where: {
        id,
      },
    })

    return user
  }

  public async create({
    email,
    name,
    password,
    phoneNumber,
    role,
    avatarUrl,
    clientId,
    providerId,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.repository.create({
      data: {
        email,
        name,
        password,
        phoneNumber,
        role,
        avatarUrl,
        clientId,
        providerId,
      },
    })

    return user
  }

  public async delete(id: string): Promise<User> {
    const user = await this.repository.delete({
      where: {
        id,
      },
    })

    return user
  }

  public async update({
    id,
    name,
    email,
    role,
    phoneNumber,
    avatarUrl,
    clientId,
    providerId,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.repository.update({
      where: { id },
      data: { name, email, role, phoneNumber, avatarUrl, clientId, providerId },
    })

    return user
  }
}

export { UsersRepository }
