import { Appointments } from '@modules/appointments/models/Appointments'
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'
import { inject, injectable } from 'tsyringe'
import { isBefore, parseISO } from 'date-fns'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateAppointmentUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, providerId, clientId }): Promise<Appointments> {
    const parsedDate = parseISO(date)

    if (isBefore(parsedDate, new Date())) {
      throw new AppError('Cannot create an appointment on a past date', 400)
    }

    const existingAppointments = await this.appointmentsRepository.findByDate(
      parsedDate,
      providerId,
    )

    if (existingAppointments.length > 0) {
      throw new AppError('This appointment is already booked', 400)
    }

    const payloadAppointment = {
      date: parsedDate,
      providerId,
      clientId,
    }

    const appointments = await this.appointmentsRepository.create(
      payloadAppointment,
    )

    return appointments
  }
}

export { CreateAppointmentUseCase }
