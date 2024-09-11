import { inject, injectable } from 'tsyringe'

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository'
import { AppError } from '@shared/errors/AppError'
import { Address } from '@modules/addresses/models/Address'

interface IRequest {
  id: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  userId: string
}

@injectable()
class UpdateAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Address> {
    const address = await this.addressesRepository.findById(data.id)

    if (!address) {
      throw new AppError('Address not found', 404)
    }

    const updatedAddress = await this.addressesRepository.update({
      ...address,
      ...data,
    })

    return updatedAddress
  }
}

export { UpdateAddressUseCase }
