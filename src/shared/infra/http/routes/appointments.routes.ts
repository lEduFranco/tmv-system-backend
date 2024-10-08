import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import { CreateAppointmentController } from '@modules/appointments/useCases/createAppointment/createAppointmentController'
import { GetAppointmentsByIdController } from '@modules/appointments/useCases/getAppointments/getAppointmentsController'
import { UpdateAppointmentsController } from '@modules/appointments/useCases/updateAppointment/updateAppointmentsController'
import { DeleteAppointmentController } from '@modules/appointments/useCases/deleteAppointment/deleteAppointmentController'
import { GetCountAppointmentsController } from '@modules/appointments/useCases/getCountAppointments/getCountAppointmentsController'
import { GetAppointmentsByDateController } from '@modules/appointments/useCases/getAppointmentsByDate/getAppointmentsByDateController'

const appointmentsRoutes = Router()

const createAppointmentController = new CreateAppointmentController()
const getAppointmentsByIdController = new GetAppointmentsByIdController()
const updateAppointmentsController = new UpdateAppointmentsController()
const deleteAppointmentController = new DeleteAppointmentController()
const getCountAppointmentsController = new GetCountAppointmentsController()
const getAppointmentsByDateController = new GetAppointmentsByDateController()

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
  '/find-by-id/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getAppointmentsByIdController.handle,
)

appointmentsRoutes.get('/count', getCountAppointmentsController.handle)

appointmentsRoutes.get(
  '/find-by-date',
  celebrate({
    [Segments.QUERY]: {
      date: Joi.string().required(),
    },
  }),
  getAppointmentsByDateController.handle,
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
