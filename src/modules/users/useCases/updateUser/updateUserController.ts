import { Response, Request } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import { UpdateUserUseCase } from "./updateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateUser = container.resolve(UpdateUserController);

    const user = await updateUser.execute({ id });

    return response.json(classToClass(user));
  }
}

export { UpdateUserController };
