import { User } from "../../../domain/entities/user";
import { NetworkErrors } from "../../../domain/errors/network_errors";
import { IUserRepository } from "../../../domain/repositories/user_repository";
import { CreateUserDTO } from "../../dtos/user/create_user.dto";

export class CreateUser{
    constructor(private readonly userRepository: IUserRepository){
    }

    async create(userInfo: CreateUserDTO): Promise<[NetworkErrors?, User?]>{
        const {name, email, password} = userInfo
        const user = new User("", name, email, password);
        return await this.userRepository.createUser(user)
    }
}