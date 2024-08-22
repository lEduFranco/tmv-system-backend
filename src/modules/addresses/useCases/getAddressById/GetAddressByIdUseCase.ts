import { inject, injectable } from 'tsyringe'

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository'
import { Address } from '@modules/addresses/models/Address'

interface IRequest {
  id: string
}

@injectable()
class GetAddressByIdUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Address> {
    const address = await this.addressesRepository.findById(data.id)

    return address
  }
}

export { GetAddressByIdUseCase }
