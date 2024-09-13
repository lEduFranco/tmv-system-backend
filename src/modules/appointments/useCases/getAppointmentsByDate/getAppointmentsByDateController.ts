import { classToClass } from 'class-transformer'
import { Response, Request } from 'express'
import { GetAppointmentsByDateUseCase } from './getAppointmentsByDateUseCase'
import { container } from 'tsyringe'

class GetAppointmentsByDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const date: string = request.query.date as string

    const getAppointmentsByIdUseCase = container.resolve(
      GetAppointmentsByDateUseCase,
    )

    const appointments = await getAppointmentsByIdUseCase.execute({ date })

    return response.json(classToClass(appointments))
  }
}

export { GetAppointmentsByDateController }
