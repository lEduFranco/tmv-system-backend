import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import { CreateAppointmentController } from '@modules/appointments/userCases/createAppointment/createAppointmentController'
import { GetAppointmentsByIdController } from '@modules/appointments/userCases/getAppointments/getAppointmentsController'
import { UpdateAppointmentsController } from '@modules/appointments/userCases/updateAppointment/updateAppointmentsController'
import { DeleteAppointmentController } from '@modules/appointments/userCases/deleteAppointment/deleteAppointmentController'

const appointmentsRoutes = Router()

const createAppointmentController = new CreateAppointmentController()
const getAppointmentsByIdController = new GetAppointmentsByIdController()
const updateAppointmentsController = new UpdateAppointmentsController()
const deleteAppointmentController = new DeleteAppointmentController()

appointmentsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      date: Joi.string().required(),
      providerId: Joi.string().uuid().required(),
      clientId: Joi.string().uuid().required(),
    },
  }),
  createAppointmentController.handle,
)

appointmentsRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getAppointmentsByIdController.handle,
)

appointmentsRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      date: Joi.string().required(),
      providerId: Joi.string().uuid().required(),
      clientId: Joi.string().uuid().required(),
    },
  }),
  updateAppointmentsController.handle,
)

appointmentsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteAppointmentController.handle,
)

export { appointmentsRoutes }
