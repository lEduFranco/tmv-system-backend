import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password, role, phoneNumber, avatarUrl } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute({
      email,
      name,
      password,
      role,
      phoneNumber,
      avatarUrl,
    })

    return response.json(classToClass(user))
  }
}

export { CreateUserController }
