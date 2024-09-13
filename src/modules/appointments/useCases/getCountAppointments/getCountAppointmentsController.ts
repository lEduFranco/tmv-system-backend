import { classToClass } from 'class-transformer'
import { Response, Request } from 'express'
import { GetCountAppointmentsUseCase } from './getCountAppointmentsUseCase'
import { container } from 'tsyringe'

class GetCountAppointmentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getCountAppointmentsUseCase = container.resolve(
      GetCountAppointmentsUseCase,
    )

    const counts = await getCountAppointmentsUseCase.execute()

    return response.json(classToClass(counts))
  }
}

export { GetCountAppointmentsController }
