import { ICreateAppointmentDTO } from "../dtos/ICreateAppointmentDTOS";

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  delete(id: string): Promise<User | undefined>;
  put(id: string, data: Partial<User>): Promise<User | undefined>;
}

export { IAppointmentsRepository };
