import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO'
import { IUpdateAddressDTO } from '../dtos/IUpdateAddressDTO'
import { Address } from '../models/Address'

interface IAddressesRepository {
  create(data: ICreateAddressDTO): Promise<Address>
  findById(id: string): Promise<Address | undefined>
  delete(id: string): Promise<Address | undefined>
  update(data: IUpdateAddressDTO): Promise<Address | undefined>
}

export { IAddressesRepository }
