import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'
import { Appointments } from '@modules/appointments/models/Appointments'
import { prisma } from '@shared/infra/prisma'
import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTOS'

class AppointmentsRepository implements IAppointmentsRepository {
  private repository: typeof prisma.appointments

  constructor() {
    this.repository = prisma.appointments
  }

  public async findById(id: string): Promise<Appointments> {
    const appointment = await this.repository.findFirst({
      where: {
        id,
      },
    })

    return appointment
  }

  public async countByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    const appointments = await this.repository.count({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    return appointments
  }

  public async findByDate(
    date: Date,
    providerId?: string,
  ): Promise<Appointments[]> {
    const where = {
      date,
    }

    if (providerId) {
      Object.assign(where, { providerId })
    }

    const appointments = await this.repository.findMany({
      where,
      include: {
        client: {
          include: {
            addresses: true,
          },
        },
        provider: {
          include: {
            addresses: true,
          },
        },
      },
    })

    return appointments
  }

  public async create({
    date,
    providerId,
    clientId,
  }: ICreateAppointmentDTO): Promise<Appointments> {
    const appointment = await this.repository.create({
      data: {
        date,
        providerId,
        clientId,
      },
    })

    return appointment
  }

  public async delete(id: string): Promise<Appointments> {
    const appointment = await this.repository.delete({
      where: {
        id,
      },
    })

    return appointment
  }

  public async update(
    id: string,
    data: Partial<Appointments>,
  ): Promise<Appointments> {
    const appointment = await this.repository.update({
      where: { id },
      data,
    })

    return appointment
  }
}

export { AppointmentsRepository }
