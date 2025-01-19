import { Router } from "express";
import { IUserRepository } from "../../domain/repositories/user_repository";
import { UserController } from "../controllers/user/user_controller";
import { EncrytpPasswordService } from "../../infraestructure/helpers/encrypt_password_service";
import { JWTService } from "../../infraestructure/helpers/jwt_service";

export class UserRoutes {
    private readonly routes = Router()
    private readonly userController: UserController
    constructor(private readonly userRepository: IUserRepository, private readonly jwtSecretKey: string) {
        this.userController = new UserController(this.userRepository, new EncrytpPasswordService(), new JWTService(jwtSecretKey) );
    }

    getRoutes(): Router{
        this.routes.post('/create', this.userController.create.bind(this.userController))
        this.routes.post('/login', this.userController.login.bind(this.userController))

        return this.routes;
    }
}