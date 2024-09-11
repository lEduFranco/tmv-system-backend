import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'
import { CreateAppointmentUseCase } from './createAppointmentUseCase'

class CreateAppointmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { date, clientId, providerId } = request.body

    const createAppointmentUserCase = container.resolve(
      CreateAppointmentUseCase,
    )

    const appointment = await createAppointmentUserCase.execute({
      date,
      clientId,
      providerId,
    })

    return response.json(classToClass(appointment))
  }
}

export { CreateAppointmentController }
