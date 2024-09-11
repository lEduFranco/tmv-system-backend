import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO'
import { IUpdateAddressDTO } from '@modules/addresses/dtos/IUpdateAddressDTO'
import { Address } from '@modules/addresses/models/Address'
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository'
import { prisma } from '@shared/infra/prisma'

class AddressesRepository implements IAddressesRepository {
  private repository: typeof prisma.address

  constructor() {
    this.repository = prisma.address
  }

  async findById(id: string): Promise<Address> {
    const Address = await this.repository.findFirst({
      where: {
        id,
      },
    })

    return Address
  }

  public async create(data: ICreateAddressDTO): Promise<Address> {
    const Address = await this.repository.create({ data })

    return Address
  }

  public async delete(id: string): Promise<Address> {
    const Address = await this.repository.delete({
      where: {
        id,
      },
    })

    return Address
  }

  public async update(data: IUpdateAddressDTO): Promise<Address> {
    const Address = await this.repository.update({
      where: { id: data.id },
      data,
    })

    return Address
  }
}

export { AddressesRepository }
