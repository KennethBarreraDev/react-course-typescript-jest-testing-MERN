import { Router } from "express";
import { IUserRepository } from "../../domain/repositories/user_repository";
import { UserController } from "../controllers/user/user_controller";
import { EncrytpPasswordService } from "../../infraestructure/helpers/encrypt_password_service";
import { JWTService } from "../../infraestructure/helpers/jwt_service";
import { EventController } from "../controllers/user/event_controller";
import { IEventRepository } from "../../domain/repositories/event_repository";

export class EventRoutes {
    private readonly routes = Router()
    private readonly eventController: EventController;
    constructor(private readonly eventRepository: IEventRepository) {
        this.eventController = new EventController(this.eventRepository );
    }

    getRoutes(): Router{
        this.routes.post('/create', this.eventController.create.bind(this.eventController))
        this.routes.put('/update/:id', this.eventController.update.bind(this.eventController))
        this.routes.delete('/delete/:id', this.eventController.delete.bind(this.eventController))
        this.routes.get('/get/:id', this.eventController.get.bind(this.eventController))
        this.routes.get('/list', this.eventController.list.bind(this.eventController))


        return this.routes;
    }
}