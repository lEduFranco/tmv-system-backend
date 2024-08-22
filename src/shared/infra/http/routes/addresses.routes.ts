import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import { CreateAddressController } from '@modules/addresses/useCases/createAddress/CreateAddressController'
import { GetAddressByIdController } from '@modules/addresses/useCases/getAddressById/GetAddressByIdController'
import { DeleteAddressController } from '@modules/addresses/useCases/deleteAddress/DeleteAddressController'
import { UpdateAddressController } from '@modules/addresses/useCases/updateAddress/UpdateAddressController'

const addressesRoutes = Router()

const createAddressController = new CreateAddressController()
const getAddressByIdController = new GetAddressByIdController()
const deleteAddressController = new DeleteAddressController()
const updateAddressController = new UpdateAddressController()

addressesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required(),
      userId: Joi.string().required(),
    },
  }),
  createAddressController.handle,
)

addressesRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getAddressByIdController.handle,
)

addressesRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteAddressController.handle,
)

addressesRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required(),
      userId: Joi.string().required(),
    },
  }),
  updateAddressController.handle,
)

export { addressesRoutes }
