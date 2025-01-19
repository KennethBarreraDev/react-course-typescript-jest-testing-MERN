import { Request, Response } from "express";
import { IUserRepository } from "../../../domain/repositories/user_repository";
import { CreateUserDTO } from "../../../application/dtos/user/create_user.dto";
import { COMMOM_NETWORK_CODES } from "../../../domain/core/constants";
import { HttpResponse } from "../../../domain/basic_http_response/basic_http_response";
import { CreateUser } from "../../../application/use_cases/user/create_user";
import { EncrytpPasswordService } from "../../../infraestructure/helpers/encrypt_password_service";
import { JWTService } from "../../../infraestructure/helpers/jwt_service";
import { LoginUserDTO } from "../../../application/dtos/user/login_user.dto";
import { LoginUser } from "../../../application/use_cases/user/login_user";

export class UserController {
    constructor(private readonly userRepository: IUserRepository, private readonly encriyptPasswordService: EncrytpPasswordService, private readonly jwtService: JWTService) {
    }

    async create(req: Request, res: Response) {
        try {
            const [error, userInfo] = await CreateUserDTO.create(req.body, this.encriyptPasswordService);
            if (error) {
                res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(error)
            }
            else if (userInfo) {
                const [error, newUser] = await new CreateUser(this.userRepository).create(userInfo);
                if (error) {
                    res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(error)
                }
                else if (newUser) {
                    res.status(COMMOM_NETWORK_CODES.SUCCESS_CREATE).json(newUser)
                }
            }
        } catch (error) {
            console.log(error);
            res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(new HttpResponse("Error creating user"))
        }
    }

    async login(req: Request, res: Response) {
        try {
            const [error, userInfo] = LoginUserDTO.create(req.body);
            if (error) {
                res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(error)
            }
            else if (userInfo) {
                const [error, foundUser] = await new LoginUser(this.userRepository).login(userInfo);
                if (error) {
                    res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(error)
                }
                else if (foundUser) {

                    if (await this.encriyptPasswordService.comparePassword(userInfo.password, foundUser.password)) {
                        res.status(COMMOM_NETWORK_CODES.SUCCESS_CREATE).json({
                            user: foundUser,
                            token: this.jwtService.signToken(JSON.stringify(foundUser))
                        })
                    }
                    else {
                        res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(new HttpResponse("email or password incorrect"))
                    }

                }
            }
        } catch (error) {
            console.log(error);
            res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(new HttpResponse("Error while login user"))
        }
    }
}