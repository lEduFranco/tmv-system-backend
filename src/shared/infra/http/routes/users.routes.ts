import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { GetUserByIdController } from '@modules/users/useCases/getUserById/getUserByIdController'
import { GetAllUsersController } from '@modules/users/useCases/getAllUsers/GetAllUsersController'
import { DeleteUserController } from '@modules/users/useCases/deleteUser/deleteUserController'
import { UpdateUserController } from '@modules/users/useCases/updateUser/updateUserController'
import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const getUserByIdController = new GetUserByIdController()
const deleteUserController = new DeleteUserController()
const updateUserController = new UpdateUserController()
const authenticateUserController = new AuthenticateUserController()
const getAllUsersController = new GetAllUsersController()

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

usersRoutes.get('/', getAllUsersController.handle)

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

usersRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      avatarUrl: Joi.string(),
      role: Joi.string().required().default('admin'),
    },
  }),
  updateUserController.handle,
)

usersRoutes.post(
  '/auth',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.handle,
)

export { usersRoutes }
