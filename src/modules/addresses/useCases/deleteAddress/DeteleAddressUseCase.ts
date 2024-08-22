import { inject, injectable } from 'tsyringe'

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  id: string
}

interface IResponse {
  message: string
}

@injectable()
class DeleteAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const address = await this.addressesRepository.findById(id)

    if (!address) {
      throw new AppError('Address not found', 404)
    }

    await this.addressesRepository.delete(id)

    return {
      message: 'Address deleted successfully',
    }
  }
}

export { DeleteAddressUseCase }
