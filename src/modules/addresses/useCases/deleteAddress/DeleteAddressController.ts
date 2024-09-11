import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { DeleteAddressUseCase } from './DeteleAddressUseCase'

class DeleteAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteAddressUseCase = container.resolve(DeleteAddressUseCase)

    const address = await deleteAddressUseCase.execute({ id })

    return response.json(classToClass(address))
  }
}

export { DeleteAddressController }
