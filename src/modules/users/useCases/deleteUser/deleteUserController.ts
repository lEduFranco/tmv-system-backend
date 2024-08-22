import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { DeleteUserUseCase } from './deleteUserUseCase'

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteUser = container.resolve(DeleteUserUseCase)

    const user = await deleteUser.execute({ id })

    return response.json(classToClass(user))
  }
}

export { DeleteUserController }
