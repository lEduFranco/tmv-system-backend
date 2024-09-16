import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { Appointments } from '@modules/appointments/models/Appointments'
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'
import { parseISO } from 'date-fns'

interface IRequest {
  id: string
  date: string
  providerId: string
  clientId: string
}

@injectable()
class UpdateAppointmentsUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Appointments> {
    const appointment = await this.appointmentsRepository.findById(data.id)

    if (!appointment) {
      throw new AppError('Appointment not found', 404)
    }

    const payload = {
      date: parseISO(data.date),
      providerId: data.providerId,
      clientId: data.clientId,
    }

    const newAppointment = await this.appointmentsRepository.update(data.id, {
      ...appointment,
      ...payload,
    })

    return newAppointment
  }
}

export { UpdateAppointmentsUseCase }
