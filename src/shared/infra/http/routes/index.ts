import { Router } from "express";

import { usersRoutes } from "./users.routes";

import { appointmentsRoutes } from "./appointments.routes";

const router = Router();

router.use("/users", usersRoutes);

router.use("/appointments", appointmentsRoutes)

export { router };
