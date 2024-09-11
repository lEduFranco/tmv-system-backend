import { Router } from 'express'

import { usersRoutes } from './users.routes'

import { appointmentsRoutes } from './appointments.routes'
import { addressesRoutes } from './addresses.routes'

const router = Router()

router.use('/users', usersRoutes)
router.use('/addresses', addressesRoutes)
router.use('/appointments', appointmentsRoutes)

export { router }
