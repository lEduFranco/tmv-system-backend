import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { GetUserByIdController } from '@modules/users/useCases/getUserById/getUserByIdController'
import { DeleteUserController } from '@modules/users/useCases/deleteUser/deleteUserController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const getUserByIdController = new GetUserByIdController()
const deleteUserController = new DeleteUserController()

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

usersRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteUserController.handle,
)

export { usersRoutes }
