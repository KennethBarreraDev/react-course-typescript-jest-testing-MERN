import { Router } from "express";
import { JWTService } from "../../infraestructure/helpers/jwt_service";
import { IUserRepository } from "../../domain/repositories/user_repository";
import { IEventRepository } from "../../domain/repositories/event_repository";
import { AuthMiddleware } from "../../infraestructure/middlewares/auth_middleware";
import { EventRoutes } from "./events_routes";
import { UserRoutes } from "./user_routes";

export class AppRoutes {
  private router = Router();

  constructor(
    private readonly jwtService: JWTService,
    private readonly jwtSecretKey: string,
    private readonly userRepository: IUserRepository,
    private readonly eventsRepository: IEventRepository
  ) {}

  getRoutes(): Router {
    this.router.use(
      "/api/user",
      new UserRoutes(this.userRepository, this.jwtSecretKey).getRoutes()
    );
    this.router.use(
      "/api/events",
      new AuthMiddleware(this.jwtService).validateJWT,
      new EventRoutes(this.eventsRepository).getRoutes()
    );
    

    return this.router;
  }
}
