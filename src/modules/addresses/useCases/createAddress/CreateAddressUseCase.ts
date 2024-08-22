import { inject, injectable } from 'tsyringe'

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository'
import { Address } from '@modules/addresses/models/Address'

interface IRequest {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  userId: string
}

@injectable()
class CreateAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Address> {
    const user = await this.addressesRepository.create(data)

    return user
  }
}

export { CreateAddressUseCase }
