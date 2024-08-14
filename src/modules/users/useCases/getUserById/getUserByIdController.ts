import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { GetUserByIdUseCase } from './getUserByIdUseCase'

class GetUserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getUserByIdUseCase = container.resolve(GetUserByIdUseCase)

    const user = await getUserByIdUseCase.execute({ id })

    return response.json(classToClass(user))
  }
}

export { GetUserByIdController }
