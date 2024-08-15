import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IResponse } from "../deleteUser/deleteUserUseCase";

interface IRequest {
  id: string;
}

interface IResponse {
  message: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await this.usersRepository.put(id);

    return {
      message: "Atualizado com sucesso!",
    };
  }
}

export { UpdateUserUseCase };
