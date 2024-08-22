import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { UpdateAddressUseCase } from './UpdateAddressUseCase'

class UpdateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { street, city, state, zipCode, country, userId } = request.body
    const { id } = request.params

    const updateAddressUseCase = container.resolve(UpdateAddressUseCase)

    const address = await updateAddressUseCase.execute({
      id,
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

export { UpdateAddressController }
