import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import { CreateAppointmentController } from "@modules/appointments/userCases/createAppointment/createAppointmentController";


const appointmentsRoutes = Router()

const createAppointmentController = new CreateAppointmentController()


appointmentsRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      date: Joi.string().required(),
      providerId: Joi.string().uuid().required(),
      clientId: Joi.string().uuid().required(),
    },
  }),
  createAppointmentController.handle
)

export {appointmentsRoutes}