import { classToClass } from "class-transformer"
import { Response, Request } from "express"
import { GetAppointmentsByIdUseCase } from "./getAppointmentsByIdUseCase"

class GetAppointmentsByIdController {
  async handle(request: Request, response: Response):Promise<Response> {
    const { id } = request.params

    const getAppointmentsByIdUseCase = container.resolve(GetAppointmentsByIdUseCase)

    const appointment = await getAppointmentsByIdUseCase.execute({ id })

    return response.json(classToClass(appointment))
  }
}

export { GetAppointmentsByIdController }