import { User } from "../../../domain/entities/user"
import { NetworkErrors } from "../../../domain/errors/network_errors"
import { IUserRepository } from "../../../domain/repositories/user_repository"
import { CreateUserDTO } from "../../dtos/user/create_user.dto"
import { LoginUserDTO } from "../../dtos/user/login_user.dto"

export class LoginUser{
    constructor(private readonly userRepository: IUserRepository){
    }

    async login(userInfo: LoginUserDTO): Promise<[NetworkErrors?, User?]>{
        const {email, password} = userInfo
        return await this.userRepository.loginUser({email, password})
    }
}