import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'

import { inject, injectable } from 'tsyringe'

import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfDay,
  addHours,
} from 'date-fns'

interface IResponse {
  countAppointmentsToday: number
  countAppointmentsWeek: number
  countAppointmentsMonth: number
  countAppointmentsYear: number
}

@injectable()
class GetCountAppointmentsUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const startOfDayDate = startOfDay(new Date())
    const endOfDayDate = addHours(startOfDayDate, 24)
    const countAppointmentsToday =
      await this.appointmentsRepository.countByDateRange(
        startOfDayDate,
        endOfDayDate,
      )

    const startOfWeekDate = startOfWeek(new Date())
    const endOfWeekDate = endOfWeek(new Date())

    const countAppointmentsWeek =
      await this.appointmentsRepository.countByDateRange(
        startOfWeekDate,
        endOfWeekDate,
      )

    const startOfMonthDate = startOfMonth(new Date())
    const endOfMonthDate = endOfMonth(new Date())

    const countAppointmentsMonth =
      await this.appointmentsRepository.countByDateRange(
        startOfMonthDate,
        endOfMonthDate,
      )

    const startOfYearDate = startOfYear(new Date())
    const endOfYearDate = endOfYear(new Date())

    const countAppointmentsYear =
      await this.appointmentsRepository.countByDateRange(
        startOfYearDate,
        endOfYearDate,
      )

    return {
      countAppointmentsToday,
      countAppointmentsWeek,
      countAppointmentsMonth,
      countAppointmentsYear,
    }
  }
}

export { GetCountAppointmentsUseCase }
