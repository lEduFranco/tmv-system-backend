import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { GetAllUsersUseCase } from './GetAllUsersUseCase'

class GetAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllUsersUseCase = container.resolve(GetAllUsersUseCase)

    const user = await getAllUsersUseCase.execute()

    return response.json(classToClass(user))
  }
}

export { GetAllUsersController }
