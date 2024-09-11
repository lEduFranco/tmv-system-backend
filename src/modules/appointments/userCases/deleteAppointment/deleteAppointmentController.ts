import { Response, Request } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import { DeleteAppointmentUseCase } from "./deleteAppointmentUseCase";

class DeleteAppointmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteAppointment = container.resolve(DeleteAppointmentUseCase)

    const appointment = await deleteAppointment.execute({ id })

    return response.json(classToClass(appointment))
  } 
}

export { DeleteAppointmentController }