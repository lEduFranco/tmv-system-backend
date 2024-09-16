import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { CreateUserUseCase } from './CreateUserUseCase'
import { CreateAddressUseCase } from '@modules/addresses/useCases/createAddress/CreateAddressUseCase'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      email,
      name,
      password,
      role,
      phoneNumber,
      avatarUrl,
      street,
      city,
      state,
      zipCode,
      country,
    } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute({
      email,
      name,
      password,
      role,
      phoneNumber,
      avatarUrl,
    })

    if (street && city && state && zipCode && country && user.id) {
      const createAddressUseCase = container.resolve(CreateAddressUseCase)

      await createAddressUseCase.execute({
        street,
        city,
        state,
        zipCode,
        country,
        userId: user.id,
      })
    }

    return response.json(classToClass(user))
  }
}

export { CreateUserController }
