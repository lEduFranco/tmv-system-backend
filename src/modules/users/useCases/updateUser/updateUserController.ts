import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { UpdateUserUseCase } from './updateUserUseCase'

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email, phoneNumber, avatarUrl, role } = request.body

    const updateUser = container.resolve(UpdateUserUseCase)

    const user = await updateUser.execute({
      id,
      avatarUrl,
      email,
      name,
      phoneNumber,
      role,
    })

    return response.json(classToClass(user))
  }
}

export { UpdateUserController }
