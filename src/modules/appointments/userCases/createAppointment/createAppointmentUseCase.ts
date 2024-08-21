import { Appointments } from "@modules/appointments/models/Appointments";
import { IAppointmentsRepository } from "@modules/appointments/repositories/IAppointmentsRepository";
import { inject, injectable } from "tsyringe";
import { parseISO } from "date-fns";

@injectable()
class CreateAppointmentUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    date,
    providerId,
    clientId,
  }): Promise<Appointments>{

    const payloadAppointment = {
      date: parseISO(date),
      providerId,
      clientId,
    }

    const appointments = await this.appointmentsRepository.create(payloadAppointment)

    return appointments
  }
}

export { CreateAppointmentUseCase }

