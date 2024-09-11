import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { GetUserByRoleUseCase } from './getUserByRoleUseCase'
import { Role } from '@modules/users/models/User'

class GetUserByRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const role = request.params.role as Role

    const getUserByRoleUseCase = container.resolve(GetUserByRoleUseCase)

    const user = await getUserByRoleUseCase.execute({ role })

    return response.json(classToClass(user))
  }
}

export { GetUserByRoleController }
