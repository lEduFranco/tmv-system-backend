import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { CreateAddressUseCase } from './CreateAddressUseCase'

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { street, city, state, zipCode, country, userId } = request.body

    const createAddressUseCase = container.resolve(CreateAddressUseCase)

    const address = await createAddressUseCase.execute({
      street,
      city,
      state,
      zipCode,
      country,
      userId,
    })

    return response.json(classToClass(address))
  }
}

export { CreateAddressController }
