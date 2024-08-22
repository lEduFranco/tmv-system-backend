import { container } from 'tsyringe'

import '@shared/container/providers'

import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import { IHashProvider } from '@modules/users/providers/HashProvider/IHashProvider'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AddressesRepository } from '@modules/addresses/infra/prisma/repositories/AddressesRepository'
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
)

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
