import { ICreateAppointmentDTO } from '../dtos/ICreateAppointmentDTOS'
import { Appointments } from '../models/Appointments'

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointments>
  findById(id: string): Promise<Appointments | undefined>
  delete(id: string): Promise<Appointments | undefined>
  update(id: string, data: Partial<Appointments>): Promise<Appointments>
}

export { IAppointmentsRepository }
