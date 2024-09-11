import { Appointments } from "@modules/appointments/models/Appointments";
import { IAppointmentsRepository } from "@modules/appointments/repositories/IAppointmentsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string
}

@injectable()
class GetAppointmentsByIdUseCase {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Appointments> {
    const appointment = await  this.appointmentsRepository.findById(id)

    if (!appointment) {
      throw new AppError("User not found", 404)
    }

    return appointment;
  }
}

export { GetAppointmentsByIdUseCase }