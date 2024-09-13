import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { Appointments } from '@modules/appointments/models/Appointments'
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequest {
  id: string
  date: Date
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
      throw new AppError('User not found', 404)
    }

    const newAppointment = await this.appointmentsRepository.update(
      data.id,
      data,
    )

    return newAppointment
  }
}

export { UpdateAppointmentsUseCase }
