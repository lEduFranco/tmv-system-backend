import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { GetUserByIdController } from '@modules/users/useCases/getUserById/getUserByIdController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const getUserByIdController = new GetUserByIdController()

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      avatarUrl: Joi.string(),
      role: Joi.string().required().default('admin'),
    },
  }),
  createUserController.handle,
)

usersRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getUserByIdController.handle,
)

export { usersRoutes }
