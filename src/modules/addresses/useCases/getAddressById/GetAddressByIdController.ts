import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { GetAddressByIdUseCase } from './GetAddressByIdUseCase'

class GetAddressByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getAddressById = container.resolve(GetAddressByIdUseCase)

    const address = await getAddressById.execute({ id })

    return response.json(classToClass(address))
  }
}

export { GetAddressByIdController }
