import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'
import { Role, User } from '@modules/users/models/User'
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

  async findByRole(role: Role): Promise<User[]> {
    const users = await this.repository.findMany({
      where: {
        role,
      },
      include: {
        addresses: true,
      },
    })

    return users
  }

  async findAll(): Promise<User[]> {
    const users = await this.repository.findMany()

    return users
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
      include: {
        addresses: true,
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

  public async update(data: IUpdateUserDTO): Promise<User> {
    const user = await this.repository.update({
      where: { id: data.id },
      data,
    })

    return user
  }
}

export { UsersRepository }
