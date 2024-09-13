import { Appointments } from '@modules/appointments/models/Appointments'
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'
import { parseISO } from 'date-fns'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  date: string
}

@injectable()
class GetAppointmentsByDateUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date }: IRequest): Promise<Appointments[]> {
    const parseDate = parseISO(date)

    const appointments = await this.appointmentsRepository.findByDate(parseDate)

    return appointments
  }
}

export { GetAppointmentsByDateUseCase }
