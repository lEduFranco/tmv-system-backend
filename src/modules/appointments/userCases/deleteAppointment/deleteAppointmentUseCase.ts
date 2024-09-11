import { inject, injectable } from 'tsyringe'

import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'

import { AppError } from '@shared/errors/AppError'

interface IRequest {
  id: string
}

interface IResponse {
  message: string
}

@injectable()
class DeleteAppointmentUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const appointment = await this.appointmentRepository.findById(id)

    if (!appointment) {
      throw new AppError('User not found', 404)
    }

    await this.appointmentRepository.delete(id)

    return {
      message: 'Deletado com sucesso!',
    }
  }
}

export { DeleteAppointmentUseCase }
