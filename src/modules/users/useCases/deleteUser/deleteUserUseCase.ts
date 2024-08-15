/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

interface IResponse {
  message: string;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await this.usersRepository.delete(id);

    return {
      message: "Deletado com sucesso!",
    };
  }
}

export { DeleteUserUseCase };
export { IResponse };
