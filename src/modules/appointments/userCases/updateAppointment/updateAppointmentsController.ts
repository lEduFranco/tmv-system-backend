import { Response, Request } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import { UpdateAppointmentsUseCase } from "./updateAppointmentsUseCase";

class UpdateAppointmentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { date, providerId, clientId } = request.body

    const updateAppointment = container.resolve(UpdateAppointmentsUseCase)

    const appointment = await updateAppointment.execute({
      id,
      date,
      providerId,
      clientId,
    })

    return response.json(classToClass(appointment))
  }
}

export { UpdateAppointmentsController }