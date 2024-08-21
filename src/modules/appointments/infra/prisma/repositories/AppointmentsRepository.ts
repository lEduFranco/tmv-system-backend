import { IAppointmentsRepository } from "@modules/appointments/repositories/IAppointmentsRepository";
import { Appointments } from "@modules/appointments/models/Appointments";
import { prisma } from "@shared/infra/prisma";
import { ICreateAppointmentDTO } from "@modules/appointments/dtos/ICreateAppointmentDTOS";

class AppointmentsRepository implements IAppointmentsRepository {
  private repository: typeof prisma.appointments;

  constructor() {
    this.repository = prisma.appointments;
  }

  async findById(id: string): Promise<Appointments> {
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
}

export { AppointmentsRepository };
