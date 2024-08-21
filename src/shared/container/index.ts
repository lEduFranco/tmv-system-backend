import { container } from 'tsyringe'

import '@shared/container/providers'

import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import { IHashProvider } from '@modules/users/providers/HashProvider/IHashProvider'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'
import { AppointmentsRepository } from '@modules/appointments/infra/prisma/repositories/AppointmentsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository)

