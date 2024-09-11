import { IAppointmentsRepository } from "@modules/appointments/repositories/IAppointmentsRepository";
import { Appointments } from "@modules/appointments/models/Appointments";
import { prisma } from "@shared/infra/prisma";
import { ICreateAppointmentDTO } from "@modules/appointments/dtos/ICreateAppointmentDTOS";

class AppointmentsRepository implements IAppointmentsRepository {
  private repository: typeof prisma.appointments;

  constructor() {
    this.repository = prisma.appointments;
  }

  public async findById(id: string): Promise<Appointments> {
    const appointment = await this.repository.findFirst({
      where: {
        id,
      },
    });

    return appointment;
  }

  public async create({
    date,
    providerId,
    clientId
  }: ICreateAppointmentDTO): Promise<Appointments> {
    const appointment = await this.repository.create({
      data: {
        date,
        providerId,
        clientId
      },
    });

    return appointment;
  }

  public async delete(id: string): Promise<Appointments> {
    const appointment = await this.repository.delete({
      where: {
        id,
      },
    })

    return appointment
  }

  public async update({
    id,
    date,
    clientId,
    providerId,
  }: IUpdateAppointmentDTO): Promise<User> {
    const user = await this.repository.update({
      where: { id },
      data: { id, date, clientId, providerId },
    })

    return user
  }
}

export { AppointmentsRepository };
